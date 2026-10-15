# 🪐 CAMPUS VERSE — COMPLETE SYSTEM ARCHITECTURE & PROJECT BLUEPRINT
> **Document Purpose**: This document is an exhaustive, production-grade technical specification of **Campus Verse**. It details every feature, hardware-software bridge, user journey, code structure, and technical workflow. It is specifically designed to be shared with AI models (such as Claude) or engineering leads to evaluate what has been built and determine the exact roadmap of what to build next.

---

## 📋 Table of Contents
1. [Project Overview & Core Vision](#1-project-overview--core-vision)
2. [Target Environments: Kiosk vs Web](#2-target-environments-kiosk-vs-web)
3. [Full Technical Architecture & Stack](#3-full-technical-architecture--stack)
4. [Hardware-Software Bridge (Kiosk -> Meta Quest 3)](#4-hardware-software-bridge-kiosk---meta-quest-3)
5. [Exhaustive Feature-by-Feature Breakdown](#5-exhaustive-feature-by-feature-breakdown)
   - [5.1 3D Landing Page & Kinetic Scrubbing (`/`)](#51-3d-landing-page--kinetic-scrubbing-)
   - [5.2 The 3-Destination Hub](#52-the-3-destination-hub)
   - [5.3 VR Games Launcher Grid (ADB Triggering)](#53-vr-games-launcher-grid-adb-triggering)
   - [5.4 Interactive Multimedia Dashboard (`/dashboard`)](#54-interactive-multimedia-dashboard-dashboard)
   - [5.5 Faculty & Leadership Directory (`/faculty`)](#55-faculty--leadership-directory-faculty)
   - [5.6 Dedicated About & Digital Twin Page (`/about`)](#56-dedicated-about--digital-twin-page-about)
6. [Data Flow & Communication Workflows](#6-data-flow--communication-workflows)
7. [Cloud Infrastructure, Supabase & Media Pipeline](#7-cloud-infrastructure-supabase--media-pipeline)
8. [Current Limitations, Tech Debt & Open Gaps](#8-current-limitations-tech-debt--open-gaps)
9. [Detailed Prompt & Questions for Claude ("Aage Kya Karna Hai?")](#9-detailed-prompt--questions-for-claude-aage-kya-karna-hai)

---

## 1. Project Overview & Core Vision

**Campus Verse** is a premier **Spatial Computing Platform & Physical Kiosk System** developed for the **Experiential Learning Centre (ELC)** at **Thapar Institute of Engineering & Technology (TIET)**.

### Core Philosophy
Traditional virtual campus tours rely on pre-rendered 360-degree flat videos stitched together or static web pages. Campus Verse redefines this paradigm by presenting:
1. **A Spatially Accurate Digital Twin**: Real-time 3D models, geometry, and spatial simulations streamed directly to modern browsers and interactive displays without downloads.
2. **Physical Touch Kiosk Integration**: A custom physical kiosk placed in the institute with a vertical touchscreen (1080x1920) tethered wirelessly to a **Meta Quest 3/3S VR Headset**.
3. **Hardware Bridge Automation**: Users select a campus tour, department project, or VR game on the kiosk touchscreen, and the system **wirelessly awakens and launches that specific experience directly inside the Meta Quest headset** without manual headset navigation.
4. **Showcase for Student Innovation**: A centralized portal featuring branch-wise projects (CSE, ECE, EIE, MECH, CIVIL, CHEM, BIOTECH), summer ELC projects, patents, startup incubations, and facility walk-throughs.

---

## 2. Target Environments: Kiosk vs Web

The codebase is engineered to support **two simultaneous deployment targets** from a single repository:

| Deployment Target | Environment | Runtime & Window | Hardware Control | Media Delivery |
| :--- | :--- | :--- | :--- | :--- |
| **Physical Kiosk** | On-Campus Hardware | Electron Desktop App (Windows, 1080x1920 Fullscreen Portrait, Touch-optimised) | Local Node.js WebSocket Bridge + Wireless ADB controlling Meta Quest 3 | Local high-bitrate video assets (`public/videos/`) for zero latency |
| **Cloud Web App** | Remote Users / Mobile / Desktop | Modern Browser (Vercel CDN, Responsive Landscape/Portrait) | Gracefully disables local WebSocket bridge to avoid mixed-content or connection errors | Scalable streaming via Supabase Storage CDN (`kiosk-media` bucket) |

---

## 3. Full Technical Architecture & Stack

```
+-----------------------------------------------------------------------------------+
|                                 USER TOUCHPOINT                                   |
|   1080x1920 Touchscreen Kiosk Display  /  Web Browser (Vercel) / Mobile Devices   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                             FRONTEND PRESENTATION LAYER                           |
|  - React 19 + Vite (Fast HMR & Optimized Bundles)                                 |
|  - Tailwind CSS v4 (Modern Styling & Responsive Utility)                          |
|  - Framer Motion (Overdamped Springs, 3D Tilt, Kinetic Drag, Fluid Gestures)      |
|  - Lucide React (Crisp HUD icons)                                                 |
+-----------------------------------------+-----------------------------------------+
       |                                  |                                  |
       v                                  v                                  v
+--------------------+        +---------------------+        +----------------------+
| 3D SPATIAL ENGINE  |        |  REACT ROUTER v7    |        | KIOSK BRIDGE CLIENT  |
| - Three.js         |        |  HashRouter for     |        | useKioskBridge.js    |
| - React Three Fiber|        |  Electron & Web     |        | - ws://localhost:8080|
| - R3F Drei / GLTF  |        |  Routes:            |        | - Launch event firing|
| - Postprocessing   |        |  '/', '/dashboard', |        | - Error & connection |
|   (Bloom, Vignette,|        |  '/faculty',        |        |   state management   |
|    Glitch, Chroma) |        |  '/about'           |        +----------+-----------+
+--------------------+        +---------------------+                   |
                                                                        v
+-----------------------------------------------------------------------------------+
|                        LOCAL BRIDGE DAEMON (Node.js / Electron)                   |
|  - Server: Express + 'ws' WebSocket Server (Port 8080)                            |
|  - Android Debug Bridge (ADB): Embedded platform-tools (adb.exe)                  |
|  - TCP/IP Connection: 'adb connect <QUEST_IP>:5555'                               |
|  - Process Control: Executes Android Intents & Monkey Launchers                   |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v (Wireless LAN: 5GHz Wi-Fi)
+-----------------------------------------------------------------------------------+
|                             META QUEST 3 / 3S HEADSET                             |
|  - Android OS / Horizon OS                                                        |
|  - 360-Degree Video Player (Intent: android.intent.action.VIEW -> /sdcard/Movies/)|
|  - Standalone VR Games (Package Launcher: monkey -p <pkg> -c android.intent...)   |
+-----------------------------------------------------------------------------------+
```

### Complete Dependency Matrix
* **Frontend Core**: `react` 19.2.8, `react-dom` 19.2.8, `react-router-dom` 7.18.3, `vite` 8.2.0.
* **3D & Graphics**: `three` 0.174.0, `@react-three/fiber` 9.7.0, `@react-three/drei` 10.7.8, `@react-three/postprocessing` 3.0.4, `maath` 0.10.8.
* **UI & Animation**: `framer-motion` 13.0.0, `lucide-react` 1.41.0, `@tsparticles/react` 4.3.2, `tsparticles` 4.3.2.
* **Desktop Kiosk Wrapper**: `electron` 44.2.0, `electron-builder` 26.15.3, `concurrently`, `wait-on`.
* **Hardware & Server**: `express` 5.2.1, `ws` 8.21.3, `cross-env`.
* **Backend & Cloud**: `@supabase/supabase-js` 2.115.0.

---

## 4. Hardware-Software Bridge (Kiosk -> Meta Quest 3)

One of the most unique and technically impressive aspects of Campus Verse is its **physical-to-spatial bridge**:

### How It Works Under the Hood
1. **Bridge Server Initiation**:
   - In Electron (`electron/main.cjs`), `startBridgeServer()` launches on application startup.
   - Alternatively, for local web development, `server/server.js` runs as a standalone daemon on port 8080.
2. **WebSocket Communication Protocol**:
   - The React frontend runs the hook [`useKioskBridge.js`](src/hooks/useKioskBridge.js).
   - If accessed via HTTPS (e.g. Vercel deployment), it silently skips the connection to avoid mixed-content browser blocking.
   - On the local kiosk, it establishes a persistent bidirectional WebSocket connection to `ws://localhost:8080` with automatic 3-second retry loops.
3. **Automated ADB Command Execution**:
   - The bridge references `adb.exe` (bundled in `resources/platform-tools/`).
   - It maintains a wireless ADB session over TCP/IP:
     ```bash
     adb connect <QUEST_IP>:5555
     ```
   - **Scenario A: Launch Campus Tours (360 VR Video Experience)**:
     ```bash
     adb -s <QUEST_IP>:5555 shell am start -a android.intent.action.VIEW -d "file:///sdcard/Movies/CampusTours/" -t "video/*"
     ```
     This triggers the Quest's native media player directly into the 360-degree tour directory.
   - **Scenario B: Launch VR Standalone Games**:
     ```bash
     adb -s <QUEST_IP>:5555 shell monkey -p <package_name> -c android.intent.category.LAUNCHER 1
     ```
     This instructs Android OS on the Quest to launch the primary game activity for that package.
4. **Visual User Feedback (`VRLaunchOverlay.jsx`)**:
   - The kiosk displays a high-tech modal overlay with rotating cyan pulse rings.
   - Message: *"LAUNCHING VR — Please put on the Meta Quest headset."*
   - If the headset is asleep, disconnected, or unpingable, the overlay transitions to warning state:
     *"ERROR — Quest not found, please wake headset."* (auto-dismisses after 5s).

---

## 5. Exhaustive Feature-by-Feature Breakdown

### 5.1 3D Landing Page & Kinetic Scrubbing (`src/pages/Home.jsx`)
* **3D Headset Showcase (`Scene.jsx`)**:
  - Renders a high-fidelity 3D model of the **Meta Quest 3** (`./meta-quest-3/source/Quest3.glb`).
  - Interactive mouse parallax & 3D tilt tracking (`rotateXSpring`, `rotateYSpring`).
  - Dual spotlights, ambient lighting, pulsating central point light, and HDR environment reflections (`Lightformer`).
  - Post-processing pipeline: Bloom, subtle Vignette, and dynamic glitch/chromatic aberration support.
* **Overdamped Spring Scrubbing**:
  - Rather than traditional vertical document scrolling, the entire landing experience is driven by gesture scrubbing (`smoothScroll`, stiffness 80, damping 26).
  - Wheel events, touch swipes, and keyboard navigation (`ArrowDown`, `PageDown`, `Space`) smoothly advance progress from `0.0` (3D Showcase) to `1.0` (Destination Hub).
* **The Detonation & Dissolve Effect**:
  - As progress passes `0.52`, the solid Quest 3 model dissolves its opacity (`RecursiveModel`).
  - Concurrently, `BurstParticles` emits an instanced field of 75 light streaks traveling outward in spherical directions.
  - `ShockwaveRing` expands outward like a sonic bloom, accompanied by a screen-blended radial white flash.
  - Background huge typography (`CAMPUS VERSE`) smoothly fades out into the distance.

---

### 5.2 The 3-Destination Hub (`src/components/UIOverlay.jsx`)
Once dissolved, the user lands on the **Destination Hub** with three interactive bento portals:

1. **E L C (Experiential Learning Centre)**:
   - **Visuals**: Royal blue accent `#3b82f6`, bespoke SVG mark (`ElcMark`), technical corner reticles, engineering dot-grid pattern.
   - **Action**: Direct router navigation to `/dashboard`.
2. **CAMPUS VERSE (Walk the Digital Twin)**:
   - **Visuals**: Glowing sky-blue accent `#38bdf8`, featured central card with pulsating status badge (`Live`).
   - **Action**: Triggers the inline **About & Digital Twin Drawer** (`activeView === 'about'`).
     - **Digital Twin Manifesto**: Explains the geometry-streamed digital campus twin and interactive learning mission.
     - **Interactive 3D Physical Kiosk Model (`KioskModel.jsx`)**: Renders an accurate 3D CAD representation of the physical kiosk hardware cabinet standing on a lit pedestal.
     - **Dynamic Canvas Panel Textures (`panelArt.js`)**: Dynamically writes real creator credits (including *Rehajpreet Kaur, Sachi, Diya Duneja, Chirag Sood, Harkaranvir Singh, Vaibhav Jain, Satvik Ganda, Rhythmpreet Singh*) onto the left cabinet mesh, and brand insignia onto the front screen mast.
     - **Sub-Menu Navigation (`activeView === 'explore'`)**:
       - *Campus Tours*: Directly calls `launchCampusTours()` to awaken the Quest 3.
       - *Lab Simulators*: Destination slot for interactive lab modules.
3. **VR GAMES (Immersive Arcade)**:
   - **Visuals**: Neon cyan accent `#67e8f9`, bespoke arcade mark (`VrGamesMark`).
   - **Action**: Opens the full-screen **VR Games Launcher Grid**.

---

### 5.3 VR Games Launcher Grid (ADB Triggering)
When the user taps "Select Game", the kiosk presents a grid of 8 pre-installed Meta Quest titles:

| Game Title | Category | Android Package Name |
| :--- | :--- | :--- |
| **MetaCrick** | Ultimate VR Cricket | `com.Capermint.VRCricket` |
| **Cover Drive** | Cricket Simulator | `io.mphillips.CoverDriveCricket22` |
| **Tennis** | Esports VR | `VRMotionLearning.TennisEsports` |
| **Badminton** | Pro VR Sports | `com.ironstonegames.badmintonvr` |
| **Population: ONE** | Battle Royale Shooter | `com.BigBoxVR.PopulationONE` |
| **Epic Roller Coasters** | Immersive Coaster | `games.b4t.epicrollercoasters.oculus` |
| **VRFS** | Physics Football Simulation | `com.immersification.vrfs` |
| **Roblox VR** | Spatial Metaverse Sandbox | `com.roblox.client` |

*Tapping any card immediately triggers the local WebSocket bridge to fire the ADB launcher intent, showing the loading overlay.*

---

### 5.4 Interactive Multimedia Dashboard (`src/pages/Dashboard.jsx`)
The main repository of academic, technical, and student achievements:

* **Bento Grid Layout**: 7 primary collection cards:
  1. *Branchwise ELC* (Branch-level engineering events)
  2. *Summer ELC* (Summer workshop innovations)
  3. *Startups* (Student ventures & incubations)
  4. *ELC Projects* (Flagship multidisciplinary prototypes)
  5. *Resources* (Advanced lab equipment, CNC, 3D printers, VR equipment)
  6. *Campus Tours* (Institute architectural walk-throughs)
  7. *Faculty* (Navigates to `/faculty`)
* **3D Card Physics**:
  - Restrained spring tilt (`rotateX`, `rotateY`) and parallax depth translation (`imgX`, `imgY`).
  - Specular dynamic lighting mask that tracks mouse/touch position across the surface of the card.
* **Departmental Modal & Drill-Down**:
  - Clicking "Branchwise ELC" opens the 7 Engineering Departments:
    - **CSE** (Computer Science & Engineering)
    - **ECE** (Electronics & Communication Engineering)
    - **EIE** (Electrical & Instrumentation Engineering)
    - **MECH** (Mechanical Engineering)
    - **CIVIL** (Civil Engineering)
    - **CHEM** (Chemical Engineering)
    - **BIOTECH** (Biotechnology)
* **Built-in Cinema Player & Playlist Drawer**:
  - Displays high-definition project documentaries (e.g. *Fasal Kavach*, *Project 21*, *Project 32G*, *Bajaj Centre*, etc.).
  - Automatic video seeking to second 2 (`#t=2`) to generate live video poster frames without manual thumbnail generation.
  - Format detection: Supports both video (`.mp4`) and high-res imagery (`.png`, `.jpg`).
  - Real-time video metadata parsing to display calculated duration timestamps (`mm:ss`).
* **Optimized Ambient Canvas Background (`InteractiveBackground.jsx`)**:
  - 3-layer floating 2D Canvas Starfield (replaces heavy 8,000-vertex 3D point waves for 60fps performance on low-power kiosk GPUs).
  - Multi-chromatic drifting background blobs and subtle engineering coordinate grid floor.

---

### 5.5 Faculty & Leadership Directory (`src/pages/Faculty.jsx`)
* **Directory Showcase**: Features prominent academic leaders and ELC coordinators:
  - **Prof. Ajay Batish** (Pro Vice-Chancellor)
  - **Dr. R.K. Duvedi** (Associate Dean ELC)
  - **Dr. Sharad Saxena** (Coordinator)
  - Assistant & Associate Professors: *Dr. V.P. Singh, Dr. Anil Arora, Dr. Bikramjit Sharma, Dr. Himanshu Chawla, Dr. Nirbhow Jap Singh, Dr. Raman Kumar Goyal, Dr. Vikas Handa, Dr. Vivek Sethi*.
* **Interactive Design**:
  - Responsive cards with high-contrast portrait photography and gradient scrims.
  - Image fallback handling (`onError` hooks).
  - Quick-action mailto pill button with animated icons.

---

### 5.6 Dedicated About & Digital Twin Page (`src/pages/About.jsx`)
* Direct route `/about` for comprehensive institute storytelling.
* Ambient background video with cool navy color-grading and directional vignette.
* Key mission pillars: *"Bridging theory and practice"* and *"Creative freedom"*.
* Interactive 3D physical kiosk model preview.

---

## 6. Data Flow & Communication Workflows

### Sequence Diagram: Kiosk Touch to VR Execution
```
[User Touch on Kiosk Screen]
           |
           v
[React UI: launchVRGame(pkg)]
           |
           v (WebSocket JSON: { event: 'LAUNCH_GAME', package: '...' })
[Node.js / Electron Bridge (Port 8080)]
           |
           v (adb connect 172.31.242.30:5555)
[Meta Quest 3 (Port 5555)] ----> [Connected / OK]
           |
           v (adb shell monkey -p <pkg> -c android.intent.category.LAUNCHER 1)
[Meta Quest OS Launches Game]
           |
           v (WebSocket JSON: { event: 'LAUNCH_SUCCESS' })
[React UI Overlay: Status 'System Ready' -> Auto-dismiss after 5s]
```

### Sequence Diagram: Media Delivery (Hybrid Local vs Cloud)
```
                    [media(path) Helper Function]
                                 |
         +-----------------------+-----------------------+
         |                                               |
(Running in Electron / Localhost)            (Running on Vercel / Remote Web)
         |                                               |
         v                                               v
[Serves from Local Filesystem]              [Proxies through Supabase CDN]
'./videos/ece/Copy of 21.mp4'               'https://<supabase-id>.supabase.co/
(Zero latency, uncompressed)                 storage/v1/object/public/kiosk-media/...'
```

---

## 7. Cloud Infrastructure, Supabase & Media Pipeline

### Supabase Architecture
* **Project Reference**: `cnckzaybkmlcfxnhvrmp`
* **Storage Bucket**: `kiosk-media` (Public bucket hosting high-resolution project footage and tour videos).
* **Database Schema (Initial Seed)**:
  - Table: `categories`
    - `id` (uuid, primary key)
    - `slug` (text, unique)
    - `title` (text)
    - `badge` (text)
    - `color` (text, hex)
    - `image_url` (text)
    - `order_index` (int4)
* **Automation Scripts**:
  - [`seed.js`](seed.js): Seeds initial collection card metadata into the Supabase database.
  - [`upload.js`](upload.js): Recursively walks the local `public/videos/` directory and synchronizes video assets with the Supabase storage bucket with appropriate MIME-types.

---

## 8. Current Limitations, Tech Debt & Open Gaps

To plan next steps effectively, here are the real architectural constraints currently in the repository:

1. **Hardcoded Headset IP Address**:
   - `QUEST_IP` is currently hardcoded (`172.31.242.30` or fallback `192.168.1.100`).
   - *Problem*: On university Wi-Fi, DHCP may reassign the Quest's IP address when rebooted, breaking the bridge until manually reconfigured in `.env` or code.
2. **One-Way Bridge Telemetry**:
   - The kiosk triggers ADB commands, but does **not actively poll headset battery percentage, Wi-Fi signal strength, or sleep state**.
   - If the headset goes into standby while sitting on the dock, the first launch may time out.
3. **Hardcoded Dashboard Content vs Supabase**:
   - `CARDS_DATA` and `DEPARTMENT_VIDEOS` are currently hardcoded in `Dashboard.jsx`.
   - The Supabase client is initialized (`src/lib/supabase.js`), and `seed.js` exists, but the frontend does not yet fetch its content dynamically from Supabase tables.
4. **Lab Simulators Action Unbound**:
   - In `UIOverlay.jsx` (lines 441-443), tapping "LAB SIMULATORS" has a placeholder comment `/* Navigation Logic for other keys */` and does not yet trigger an action or route.
5. **No Direct WebXR In-Browser Fallback for Remote Users**:
   - If a student visits the website on an iPhone or home PC, clicking "Campus Tours" tries to reach `ws://localhost:8080`, which fails. There is no direct WebXR / 360-video panoramic viewer running directly in the browser as a fallback.
6. **No Kiosk Inactivity Watchdog / Auto-Reset**:
   - If a student walks away mid-video on the physical kiosk, the page stays on that video indefinitely. There is no idle timer that returns the kiosk to the 3D Quest hero screen after 60-90 seconds.

---

## 9. Detailed Prompt & Questions for Claude ("Aage Kya Karna Hai?")

> 💡 **Instructions for Claude**: You are the Senior Principal Architect and Creative Technologist on the Campus Verse project. Read the above system specification carefully. Based on this existing stack (React 19, R3F, Electron, Wireless ADB, Supabase, Meta Quest 3), provide a prioritized, phased engineering roadmap.

Please address the following architectural pillars in detail:

### Milestone 1: Robust Headset Auto-Discovery & Health Telemetry
* How can we eliminate hardcoding the Quest IP? Can we implement an mDNS discovery service, an automatic ARP/Subnet ping scanner, or a lightweight Android background service APK on the Quest that broadcasts a UDP heartbeat to the kiosk?
* How can we display real-time Quest battery percentage, temperature, and wear-state (proximity sensor detection) as a futuristic HUD element on the kiosk UI?

### Milestone 2: Dynamic Supabase CMS & Admin Management
* Design a clean Supabase database schema (`categories`, `departments`, `projects`, `media`, `kiosk_telemetry`, `faculty`).
* How should we refactor `Dashboard.jsx` to fetch live collections and department media from Supabase with local IndexedDB/localStorage offline caching so the kiosk works even if campus internet drops?
* What is the cleanest architecture for a lightweight `/admin` dashboard where faculty/students can upload new project videos, add tags, and update faculty bios without modifying React code?

### Milestone 3: WebXR & Direct Browser Fallback for Cloud Web
* When remote users access Campus Verse on mobile or desktop via Vercel, how should we implement an in-browser WebXR / Three.js 360-degree panorama viewer (`SphereGeometry` with equirectangular projection or Gaussian Splatting) when they tap "Campus Tours" or "Lab Simulators"?
* What is the recommended approach for integrating 3D interactive Lab Simulators (e.g. Virtual oscilloscope, robotics arm, circuit testing) directly in WebGL?

### Milestone 4: Kiosk Hardening & Public Display UX
* How should we implement a robust idle watchdog hook (`useKioskIdleTimeout`) that smoothly returns the user from deep modals or sub-pages back to the 3D hero landing screen after 60 seconds of inactivity?
* What watchdog patterns should we implement in Electron to auto-restart the bridge server if ADB hangs or disconnects?

### Milestone 5: Analytics & Interactive Gamification
* What privacy-friendly analytics should we record to Supabase (e.g. most viewed department projects, most played VR games, peak usage hours)?
* Could we add a QR code generator modal on any project card so students at the physical kiosk can scan with their phone and take the project documentation/video home?

---
*Document generated for Campus Verse Architecture Review — Thapar Institute of Engineering & Technology.*
