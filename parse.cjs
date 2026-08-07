const fs = require('fs');
const html = fs.readFileSync('thapar.html', 'utf8');

const items = [];
const regex = /<div class="int-desc fclt-detl">([\s\S]*?)<\/div>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const block = match[1];
    const nameMatch = block.match(/<strong class="tit">(.*?)<\/strong>/);
    const roleMatch = block.match(/<span>(.*?)<\/span>/);
    const emailMatch = block.match(/Email<\/strong> <\/br>([\s\S]*?)<\/p>/);
    
    if (nameMatch) {
        items.push({
            name: nameMatch[1].trim(),
            role: roleMatch ? roleMatch[1].trim() : '',
            email: emailMatch ? emailMatch[1].replace(/<[^>]+>/g, '').trim() : ''
        });
    }
}

const imgRegex = /<div class="int-img">[\s\S]*?<img src="(.*?)"/g;
let imgMatch;
let i = 0;
while ((imgMatch = imgRegex.exec(html)) !== null && i < items.length) {
    items[i].image = 'https://www.thapar.edu' + imgMatch[1];
    i++;
}

fs.writeFileSync('faculty_data.json', JSON.stringify(items, null, 2));
console.log('Saved to faculty_data.json');
