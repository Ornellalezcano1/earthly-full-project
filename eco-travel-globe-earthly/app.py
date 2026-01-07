from flask import Flask, jsonify
from flask_cors import CORS
import csv
import json
import os

app = Flask(__name__)
# CORS habilitado para permitir la conexión desde el frontend (Next.js/Canvas)
CORS(app)

# Diccionario de coordenadas para los países principales
# (Se recomienda expandir esta lista o cargarla desde un JSON externo para cubrir todo el globo)
COUNTRY_COORDS = {
    "AFG": [33.9391, 67.7100], "ARG": [-38.4161, -63.6167], "AUS": [-25.2744, 133.7751],
    "BRA": [-14.2350, -51.9253], "CAN": [56.1304, -106.3468], "CHN": [35.8617, 104.1954],
    "FRA": [46.2276, 2.2137], "DEU": [51.1657, 10.4515], "IND": [20.5937, 78.9629],
    "ITA": [41.8719, 12.5674], "JPN": [36.2048, 138.2529], "MEX": [23.6345, -102.5528],
    "NOR": [60.4720, 8.4689], "ESP": [40.4637, -3.7492], "USA": [37.0902, -95.7129],
    "CHL": [-35.6751, -71.5430], "COL": [4.5709, -74.2973], "URY": [-32.5228, -55.7658],
    "ISL": [64.9631, -19.0208], "NZL": [-40.9006, 174.8860], "CHE": [46.8182, 8.2275],
    "GBR": [55.3781, -3.4360], "RUS": [61.5240, 105.3188], "KOR": [35.9078, 127.7669],
    "ZAF": [-30.5595, 22.9375], "EGY": [26.8206, 30.8025], "PER": [-9.1900, -75.0152]
}

def load_csv_to_dict(filepath, key_col, val_col):
    """Carga un CSV y devuelve un diccionario {ISO: Valor}."""
    data = {}
    if not os.path.exists(filepath):
        print(f"Advertencia: No se encontró {filepath}")
        return data
    try:
        # Se usa utf-8-sig para ignorar el BOM de archivos guardados desde Excel
        with open(filepath, "r", encoding="utf-8-sig") as f:
            reader = csv.DictReader(f)
            for row in reader:
                iso = row.get(key_col, "").upper().strip()
                if iso:
                    data[iso] = row.get(val_col, "0")
    except Exception as e:
        print(f"Error cargando {filepath}: {e}")
    return data

@app.route('/')
def health_check():
    """Ruta de diagnóstico para verificar el estado de los archivos en el servidor."""
    base_path = os.path.join("globe-eco", "data")
    
    # Lista completa de los 17 archivos proporcionados
    files_to_check = [
        "air_pollution.csv", "co2.csv", "energy.csv", "epi.csv", 
        "forest_area.csv", "gdp.csv", "gini.csv", "governance.csv", 
        "hdi.csv", "iso_names.csv", "life_expectancy.csv", "safe_water.csv", 
        "wdi_protected_marine.csv", "wdi_protected_terrestrial.csv", 
        "wdi_protected.csv", "wdi_rail.csv", "wdi_renewables.csv"
    ]
    
    status = {}
    for f in files_to_check:
        path = os.path.join(base_path, f)
        status[f] = "Encontrado" if os.path.exists(path) else "¡FALTA!"
        
    return jsonify({
        "server_status": "online",
        "working_directory": os.getcwd(),
        "files_diagnostic": status,
        "total_files_expected": len(files_to_check),
        "api_endpoint": "/api/data"
    })

@app.route('/api/data')
def get_data():
    """Combina todos los CSVs y genera los puntos para el globo Three.js."""
    base_path = os.path.join("globe-eco", "data")
    
    # Carga de la base de datos completa
    air_pollution = load_csv_to_dict(os.path.join(base_path, "air_pollution.csv"), "isoA3", "value")
    co2_data = load_csv_to_dict(os.path.join(base_path, "co2.csv"), "isoA3", "value")
    ren_data = load_csv_to_dict(os.path.join(base_path, "wdi_renewables.csv"), "isoA3", "value")
    epi_data = load_csv_to_dict(os.path.join(base_path, "epi.csv"), "isoA3", "value")
    hdi_data = load_csv_to_dict(os.path.join(base_path, "hdi.csv"), "isoA3", "value")
    forest_data = load_csv_to_dict(os.path.join(base_path, "forest_area.csv"), "isoA3", "value")
    iso_names = load_csv_to_dict(os.path.join(base_path, "iso_names.csv"), "isoA3", "value")
    
    # Nuevas métricas cargadas
    life_exp = load_csv_to_dict(os.path.join(base_path, "life_expectancy.csv"), "isoA3", "value")
    safe_water = load_csv_to_dict(os.path.join(base_path, "safe_water.csv"), "isoA3", "value")
    gdp = load_csv_to_dict(os.path.join(base_path, "gdp.csv"), "isoA3", "value")
    gini = load_csv_to_dict(os.path.join(base_path, "gini.csv"), "isoA3", "value")
    governance = load_csv_to_dict(os.path.join(base_path, "governance.csv"), "isoA3", "value")

    points = []
    for iso, coords in COUNTRY_COORDS.items():
        name = iso_names.get(iso, iso)
        
        try:
            # Lógica de cálculo del Score (Sostenibilidad Estimada)
            val_ren = float(ren_data.get(iso, 0))
            val_hdi = float(hdi_data.get(iso, 0.7)) 
            val_epi = float(epi_data.get(iso, 50)) / 100
            val_co2 = float(co2_data.get(iso, 0))
            
            # Algoritmo de puntuación Earthly (Ajustado con nuevas variables si se desea)
            score_calc = ((val_ren + val_hdi + val_epi) / 3) - (val_co2 / 20)
            score = max(10, min(95, score_calc * 100))
        except:
            score = 50

        # Determinación de color para el globo (Rojo, Amarillo, Verde)
        color = "#ef4444" if score < 40 else "#fbbf24" if score < 70 else "#22c55e"

        points.append({
            "id": len(points),
            "iso": iso,
            "name": name,
            "lat": coords[0],
            "lon": coords[1],
            "score": round(score, 1),
            "co2": co2_data.get(iso, "N/A"),
            "renewables": f"{float(ren_data.get(iso, 0))*100:.1f}%" if iso in ren_data else "N/A",
            "hdi": hdi_data.get(iso, "N/A"),
            "epi": epi_data.get(iso, "N/A"),
            "pollution": air_pollution.get(iso, "N/A"),
            "forest": forest_data.get(iso, "N/A"),
            "life": life_exp.get(iso, "N/A"),
            "water": safe_water.get(iso, "N/A"),
            "gdp": gdp.get(iso, "N/A"),
            "gini": gini.get(iso, "N/A"),
            "governance": governance.get(iso, "N/A"),
            "trivia": f"Este país presenta un índice de sostenibilidad del {round(score, 1)}% y una esperanza de vida de {life_exp.get(iso, 'N/A')} años.",
            "color": color
        })

    return jsonify(points)

if __name__ == '__main__':
    # El servidor corre en el puerto 5000 por defecto
    app.run(debug=True, port=5000)