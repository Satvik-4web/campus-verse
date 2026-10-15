import { useState, useEffect, useCallback, useRef } from 'react';
import { runtime } from '../../shared/config/env';

export function useKioskBridge() {
  const [isConnected, setIsConnected] = useState(false);
  const [isVRLoading, setIsVRLoading] = useState(false);
  const [vrError, setVrError] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    // If running in cloud web or bridge is disabled, skip WebSocket connection
    if (!runtime.bridgeEnabled) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    console.log('[Kiosk Bridge] Attempting connection to', runtime.bridgeUrl);
    const ws = new WebSocket(runtime.bridgeUrl);

    ws.onopen = () => {
      console.log('[Kiosk Bridge] Connected to local bridge server.');
      setIsConnected(true);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[Kiosk Bridge] Message from server:', data);
        
        if (data.event === 'LAUNCH_SUCCESS') {
          setTimeout(() => {
            setIsVRLoading(false);
            setVrError(null);
          }, 5000);
        } else if (data.event === 'ERROR') {
          console.error('[Kiosk Bridge] Server error:', data.message);
          setVrError(data.message || 'Quest not found, please wake headset.');
          setTimeout(() => setIsVRLoading(false), 5000);
        }
      } catch (err) {
        console.error('[Kiosk Bridge] Error parsing message:', err);
      }
    };

    ws.onclose = () => {
      console.log('[Kiosk Bridge] Disconnected from server. Reconnecting in 3s...');
      setIsConnected(false);
      reconnectTimeoutRef.current = setTimeout(connect, 3000);
    };

    ws.onerror = (err) => {
      console.error('[Kiosk Bridge] WebSocket error:', err);
      ws.close();
    };

    wsRef.current = ws;
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [connect]);

  const launchCampusTours = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('[Kiosk Bridge] Triggering Campus Tours...');
      setIsVRLoading(true);
      setVrError(null);
      wsRef.current.send(JSON.stringify({
        event: 'LAUNCH_TOURS'
      }));
    } else {
      console.error('[Kiosk Bridge] Cannot trigger: WebSocket not connected.');
      setIsVRLoading(true);
      setVrError(runtime.isWeb ? 'VR Headset integration is enabled on physical kiosk only.' : 'Bridge Server disconnected. Ensure Node is running.');
      setTimeout(() => setIsVRLoading(false), 5000);
    }
  }, []);

  const launchVRGame = useCallback((packageName) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log(`[Kiosk Bridge] Triggering VR Game: ${packageName}`);
      setIsVRLoading(true);
      setVrError(null);
      wsRef.current.send(JSON.stringify({
        event: 'LAUNCH_GAME',
        package: packageName
      }));
    } else {
      console.error('[Kiosk Bridge] Cannot trigger: WebSocket not connected.');
      setIsVRLoading(true);
      setVrError(runtime.isWeb ? 'VR Headset integration is enabled on physical kiosk only.' : 'Bridge Server disconnected. Ensure Node is running.');
      setTimeout(() => setIsVRLoading(false), 5000);
    }
  }, []);

  return {
    isConnected,
    isVRLoading,
    vrError,
    launchCampusTours,
    launchVRGame,
    setIsVRLoading
  };
}
