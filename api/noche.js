// Vercel Serverless Function (PaaS) que consume Open-Meteo (Information as a Service)
// Departamento -> Provincia -> [distrito, lat, lon]. El id de cada distrito es "d-p-i" (posiciones en esta lista).
const DEPS = [["Amazonas",[["Chachapoyas",[["Chachapoyas",-6.2317,-77.869]]],
  ["Utcubamba",[["Bagua Grande",-5.757,-78.442]]],
  ["Bagua",[["Bagua",-5.639,-78.531]]]]],
  ["Áncash",[["Huaraz",[["Huaraz",-9.5278,-77.5278]]],
  ["Santa",[["Chimbote",-9.0853,-78.5783]]],
  ["Huaylas",[["Caraz",-9.047,-77.811]]],
  ["Casma",[["Casma",-9.474,-78.305]]]]],
  ["Apurímac",[["Abancay",[["Abancay",-13.6339,-72.8814]]],
  ["Andahuaylas",[["Andahuaylas",-13.656,-73.387]]]]],
  ["Arequipa",[["Arequipa",[["Arequipa",-16.409,-71.5375],
  ["Cayma",-16.368,-71.539],
  ["Yanahuara",-16.39,-71.547],
  ["Cerro Colorado",-16.37,-71.56]]],
  ["Camaná",[["Camaná",-16.624,-72.711]]],
  ["Islay",[["Mollendo",-17.0233,-72.0147]]]]],
  ["Ayacucho",[["Huamanga",[["Ayacucho",-13.1588,-74.2236]]],
  ["Huanta",[["Huanta",-12.939,-74.247]]],
  ["Lucanas",[["Puquio",-14.699,-74.131]]]]],
  ["Cajamarca",[["Cajamarca",[["Cajamarca",-7.1638,-78.5003]]],
  ["Jaén",[["Jaén",-5.709,-78.807]]],
  ["Chota",[["Chota",-6.56,-78.649]]],
  ["Cutervo",[["Cutervo",-6.377,-78.817]]]]],
  ["Callao",[["Callao",[["Callao",-12.0566,-77.1181],
  ["Ventanilla",-11.875,-77.126],
  ["La Punta",-12.072,-77.164]]]]],
  ["Cusco",[["Cusco",[["Cusco",-13.532,-71.9675],
  ["Wanchaq",-13.526,-71.943],
  ["Santiago",-13.533,-71.989]]],
  ["Urubamba",[["Urubamba",-13.305,-72.117],
  ["Ollantaytambo",-13.258,-72.263],
  ["Machu Picchu Pueblo",-13.155,-72.525]]],
  ["Canchis",[["Sicuani",-14.27,-71.226]]]]],
  ["Huancavelica",[["Huancavelica",[["Huancavelica",-12.787,-74.973]]],
  ["Tayacaja",[["Pampas",-12.3977,-74.8672]]]]],
  ["Huánuco",[["Huánuco",[["Huánuco",-9.9306,-76.2422]]],
  ["Leoncio Prado",[["Tingo María",-9.297,-76.001]]],
  ["Ambo",[["Ambo",-10.129,-76.204]]]]],
  ["Ica",[["Ica",[["Ica",-14.0678,-75.7286]]],
  ["Chincha",[["Chincha Alta",-13.41,-76.132]]],
  ["Pisco",[["Pisco",-13.71,-76.203],
  ["Paracas",-13.8333,-76.25]]],
  ["Nasca",[["Nasca",-14.83,-74.939]]]]],
  ["Junín",[["Huancayo",[["Huancayo",-12.0651,-75.2049],
  ["El Tambo",-12.05,-75.22]]],
  ["Tarma",[["Tarma",-11.418,-75.69]]],
  ["Jauja",[["Jauja",-11.775,-75.497]]],
  ["Yauli",[["La Oroya",-11.519,-75.9]]],
  ["Satipo",[["Satipo",-11.253,-74.638]]],
  ["Chanchamayo",[["La Merced",-11.055,-75.326]]]]],
  ["La Libertad",[["Trujillo",[["Trujillo",-8.1118,-79.0288],
  ["Huanchaco",-8.078,-79.122]]],
  ["Chepén",[["Chepén",-7.225,-79.43]]],
  ["Pacasmayo",[["Pacasmayo",-7.4,-79.57]]],
  ["Sánchez Carrión",[["Huamachuco",-7.819,-78.048]]]]],
  ["Lambayeque",[["Chiclayo",[["Chiclayo",-6.7714,-79.8409],
  ["Pimentel",-6.837,-79.934]]],
  ["Lambayeque",[["Lambayeque",-6.702,-79.906]]],
  ["Ferreñafe",[["Ferreñafe",-6.639,-79.789]]]]],
  ["Lima",[["Lima",[["Miraflores",-12.1219,-77.0297],
  ["San Isidro",-12.0977,-77.0365],
  ["Barranco",-12.1403,-77.0207],
  ["Santiago de Surco",-12.145,-76.991],
  ["La Molina",-12.085,-76.91],
  ["San Borja",-12.1089,-76.9996],
  ["Surquillo",-12.112,-77.02],
  ["Jesús María",-12.0706,-77.0517],
  ["Lince",-12.0833,-77.0333],
  ["Pueblo Libre",-12.072,-77.063],
  ["Magdalena del Mar",-12.09,-77.072],
  ["San Miguel",-12.077,-77.083],
  ["Cercado de Lima",-12.0464,-77.0428],
  ["Rímac",-12.029,-77.043],
  ["Breña",-12.056,-77.05],
  ["La Victoria",-12.067,-77.016],
  ["El Agustino",-12.045,-77.01],
  ["San Luis",-12.077,-76.997],
  ["Santa Anita",-12.043,-76.971],
  ["Ate",-12.026,-76.917],
  ["San Juan de Lurigancho",-11.985,-77.008],
  ["Lurigancho-Chosica",-11.938,-76.699],
  ["Independencia",-11.99,-77.054],
  ["Los Olivos",-11.97,-77.071],
  ["San Martín de Porres",-12.0,-77.085],
  ["Comas",-11.93,-77.05],
  ["Carabayllo",-11.867,-77.036],
  ["Puente Piedra",-11.865,-77.075],
  ["Chorrillos",-12.169,-77.012],
  ["San Juan de Miraflores",-12.158,-76.969],
  ["Villa El Salvador",-12.213,-76.938],
  ["Pachacámac",-12.229,-76.861]]],
  ["Huaura",[["Huacho",-11.107,-77.605]]],
  ["Huaral",[["Huaral",-11.495,-77.207]]],
  ["Barranca",[["Barranca",-10.75,-77.761]]],
  ["Cañete",[["Cañete",-13.078,-76.387]]]]],
  ["Loreto",[["Maynas",[["Iquitos",-3.7491,-73.2538],
  ["Punchana",-3.724,-73.248],
  ["Belén",-3.765,-73.25]]],
  ["Alto Amazonas",[["Yurimaguas",-5.9,-76.117]]],
  ["Loreto",[["Nauta",-4.505,-73.576]]]]],
  ["Madre de Dios",[["Tambopata",[["Puerto Maldonado",-12.5933,-69.1891]]],
  ["Tahuamanu",[["Iberia",-11.406,-69.488],
  ["Iñapari",-10.98,-69.57]]]]],
  ["Moquegua",[["Mariscal Nieto",[["Moquegua",-17.1956,-70.935]]],
  ["Ilo",[["Ilo",-17.64,-71.338]]]]],
  ["Pasco",[["Pasco",[["Cerro de Pasco",-10.686,-76.256]]],
  ["Oxapampa",[["Oxapampa",-10.574,-75.403],
  ["Villa Rica",-10.737,-75.271]]]]],
  ["Piura",[["Piura",[["Piura",-5.1945,-80.6328],
  ["Castilla",-5.2,-80.61]]],
  ["Sullana",[["Sullana",-4.904,-80.685]]],
  ["Paita",[["Paita",-5.089,-81.114]]],
  ["Talara",[["Talara",-4.577,-81.272],
  ["Máncora",-4.103,-81.045]]],
  ["Morropón",[["Chulucanas",-5.094,-80.163]]]]],
  ["Puno",[["Puno",[["Puno",-15.8402,-70.0219]]],
  ["San Román",[["Juliaca",-15.5,-70.133]]],
  ["El Collao",[["Ilave",-16.083,-69.64]]],
  ["Melgar",[["Ayaviri",-14.88,-70.59]]],
  ["Azángaro",[["Azángaro",-14.907,-70.194]]]]],
  ["San Martín",[["San Martín",[["Tarapoto",-6.489,-76.373]]],
  ["Moyobamba",[["Moyobamba",-6.034,-76.972]]],
  ["Rioja",[["Rioja",-6.063,-77.168]]],
  ["Mariscal Cáceres",[["Juanjuí",-7.179,-76.728]]],
  ["Tocache",[["Tocache",-8.183,-76.512]]]]],
  ["Tacna",[["Tacna",[["Tacna",-18.0146,-70.2536],
  ["Pocollay",-17.997,-70.22],
  ["Alto de la Alianza",-17.99,-70.248]]]]],
  ["Tumbes",[["Tumbes",[["Tumbes",-3.5669,-80.4515]]],
  ["Contralmirante Villar",[["Zorritos",-3.68,-80.68]]],
  ["Zarumilla",[["Zarumilla",-3.501,-80.273]]]]],
  ["Ucayali",[["Coronel Portillo",[["Pucallpa",-8.3791,-74.5539],
  ["Yarinacocha",-8.34,-74.58]]],
  ["Padre Abad",[["Aguaytía",-9.031,-75.511]]],
  ["Atalaya",[["Atalaya",-10.73,-73.758]]]]]];

const WET = [51,53,55,56,57,61,63,65,66,67,80,81,82];
const STORM = [95,96,99];

export default async function handler(req, res) {
  // Sin parámetros: devuelve la lista para llenar el selector
  if (!req.query.place) {
    res.setHeader('Cache-Control', 's-maxage=86400');
    return res.status(200).json({ departments: DEPS.map(([name, provs], d) => ({ name, provinces: provs.map(([pn, ds], p) => ({ name: pn, districts: ds.map(([n], i) => ({ id: d + '-' + p + '-' + i, name: n })) })) })) });
  }
  const [d, pv, i] = String(req.query.place).split('-').map(Number);
  const hit = DEPS[d]?.[1][pv]?.[1][i];
  if (!hit) return res.status(400).json({ error: 'Elige departamento, provincia y distrito de la lista.' });
  const p = { name: hit[0], lat: hit[1], lon: hit[2], dep: DEPS[d][0], prov: DEPS[d][1][pv][0] };
  try {
    const w = await (await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=' + p.lat + '&longitude=' + p.lon +
      '&current=temperature_2m&hourly=temperature_2m,precipitation_probability,precipitation,wind_speed_10m,weather_code' +
      '&timezone=auto&forecast_days=2'
    )).json();

    // Ventana de pedir dulces: 18:00–22:00 hora local (si ya pasó, mañana)
    const now = w.current.time;
    const day = Number(now.slice(11, 13)) >= 22 ? w.hourly.time[24].slice(0, 10) : now.slice(0, 10);
    const idx = w.hourly.time.map((t, i) => [t, i])
      .filter(([t]) => t.startsWith(day) && +t.slice(11, 13) >= 18 && +t.slice(11, 13) <= 22).map(([, i]) => i);
    const h = w.hourly, avg = k => idx.reduce((s, i) => s + h[k][i], 0) / idx.length;
    const temp = avg('temperature_2m'), prob = avg('precipitation_probability'),
          wind = avg('wind_speed_10m'), mm = idx.reduce((s, i) => s + h.precipitation[i], 0);
    const codes = idx.map(i => h.weather_code[i]);

    let score = 100; const tips = [];
    score -= prob * 0.5;
    if (mm > 0.5) { score -= 15; tips.push('Lleva paraguas o impermeable: caerá agua.'); }
    if (wind > 25) { score -= 20; tips.push('Viento fuerte: las capas y los gorros de bruja saldrán volando.'); }
    else if (wind > 15) { score -= 8; tips.push('Algo de viento: asegura disfraces y sombreros.'); }
    if (temp < 8) { score -= 25; tips.push('Hace mucho frío: abrígate bajo el disfraz.'); }
    else if (temp < 12) { score -= 12; tips.push('Fresquito: lleva una capa extra.'); }
    else if (temp > 30) { score -= 10; tips.push('Calor: hidrátate, los disfraces pesados sofocan.'); }
    if (codes.some(c => STORM.includes(c))) { score -= 40; tips.push('Tormenta eléctrica en el pronóstico: mejor adentro.'); }
    score = Math.max(0, Math.round(score));
    if (!tips.length) tips.push('Cielo cooperando: ¡lleva una bolsa grande!');

    const mood = score >= 75 ? 'happy' : score >= 50 ? 'meh' : 'scared';
    const verdict = { happy: '¡Noche perfecta para pedir dulces!', meh: 'Se puede salir, pero con precauciones.', scared: 'Mejor quédate en casa esta noche.' }[mood];

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    res.status(200).json({
      city: p.name + ', ' + p.prov + ', ' + p.dep, country: 'Perú', day, score, mood, verdict, tips,
      stats: { temp: +temp.toFixed(1), rain: Math.round(prob), wind: +wind.toFixed(1), mm: +mm.toFixed(1) },
      hours: idx.map(i => ({ h: h.time[i].slice(11, 16), t: h.temperature_2m[i], p: h.precipitation_probability[i], w: h.wind_speed_10m[i], wet: WET.includes(h.weather_code[i]) }))
    });
  } catch (e) {
    res.status(502).json({ error: 'El servicio del clima no respondió. Intenta de nuevo.' });
  }
}
