import { NextResponse } from 'next/server';

/**
 * Este archivo reemplaza al backend de Python.
 * Next.js servirá estos datos automáticamente.
 */
export async function GET() {
  const ecoData = [
    { 
      id: 1, 
      name: "Amazonas, Brasil", 
      lat: -3.4653, 
      lon: -62.2159, 
      type: "Reserva", 
      description: "Protección masiva de biodiversidad y reforestación.", 
      color: "#4ade80", 
      status: "Activo" 
    },
    { 
      id: 2, 
      name: "Reikiavik, Islandia", 
      lat: 64.1265, 
      lon: -21.8174, 
      type: "Energía", 
      description: "Líder en energía geotérmica y turismo de bajo impacto.", 
      color: "#60a5fa", 
      status: "Investigación" 
    },
    { 
      id: 3, 
      name: "Borneo, Indonesia", 
      lat: 0.9619, 
      lon: 114.5548, 
      type: "Fauna", 
      description: "Santuario de orangutanes y selvas vírgenes.", 
      color: "#fbbf24", 
      status: "Activo" 
    },
    { 
      id: 4, 
      name: "Tulum, México", 
      lat: 20.2114, 
      lon: -87.4654, 
      type: "Ecoturismo", 
      description: "Arqueología y conservación de cenotes.", 
      color: "#2dd4bf", 
      status: "Sostenible" 
    },
    { 
      id: 5, 
      name: "Masái Mara, Kenia", 
      lat: -1.4832, 
      lon: 35.1439, 
      type: "Safari", 
      description: "Gestión comunitaria de vida silvestre.", 
      color: "#f87171", 
      status: "Protegido" 
    }
  ];

  return NextResponse.json(ecoData);
}