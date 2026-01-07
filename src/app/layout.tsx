import React from "react";
/**
 * Importamos los estilos globales. 
 * Se ha corregido el nombre a 'globals.css' para resolver el error 'Module not found'.
 */
import "./globals.css";

export const metadata = {
  title: "Earthly",
  description: "Explore el mundo de forma responsable",
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
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: "#050609",
        color: "white"
      }}>
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