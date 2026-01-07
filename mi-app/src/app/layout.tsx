import React from "react";
/**
 * Importamos los estilos globales. 
 * Se ha corregido el nombre a 'globals.css' para resolver el error 'Module not found'.
 */
import "./globals.css";

// Definimos el SVG del favicon directamente como un string para usarlo en los metadatos
const faviconSvg = `
<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
  <rect width='24' height='24' rx='5' fill='black' />
  <g stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'>
    <circle cx='12' cy='12' r='8' />
    <path d='M12 4a14.5 14.5 0 0 0 0 16 14.5 14.5 0 0 0 0-16' />
    <path d='M4 12h16' />
  </g>
</svg>
`.trim();

export const metadata = {
  title: "Earthly",
  description: "Explore el mundo de forma responsable",
  icons: {
    // Usamos data:image/svg+xml para decirle al navegador que es un SVG
    icon: `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`,
  },

  // ✅ Imagen para compartir en WhatsApp / redes
  openGraph: {
    title: "Earthly",
    description: "Explore el mundo de forma responsable",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earthly",
    description: "Explore el mundo de forma responsable",
    images: ["/og-image.png"],
  },
};

/**
 * RootLayout es el componente maestro de la aplicación.
 * Aplica los márgenes de Earthly: 30px (arriba/abajo) y 60px (lados)
 * mediante la clase 'earthly-layout' definida en globals.css.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#050609",
          color: "white",
        }}
      >
        {/* El contenedor 'main' con la clase 'earthly-layout' garantiza 
            el encuadre de 1920x1080 con los márgenes solicitados.
        */}
        <main className="earthly-layout">
          {children}
        </main>
      </body>
    </html>
  );
}
