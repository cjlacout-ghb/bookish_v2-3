import os
import sys

def get_data_dir():
    home = os.path.expanduser("~")
    if sys.platform == "win32":
        return os.path.join(os.environ.get("APPDATA", home), "Bookish")
    elif sys.platform == "darwin":
        return os.path.join(home, "Library", "Application Support", "Bookish")
    else:
        return os.path.join(home, ".bookish")

DATA_DIR = get_data_dir()
os.makedirs(DATA_DIR, exist_ok=True)

# Directorio raíz del script original
BASE_DIR = os.path.dirname(__file__)

# Directorio donde se almacenan las portadas (ahora en AppData)
COVERS_DIR = os.path.join(DATA_DIR, "covers")
os.makedirs(COVERS_DIR, exist_ok=True)

# Tamaño máximo permitido para imágenes de portada (5 MB)
MAX_COVER_SIZE_BYTES = 5 * 1024 * 1024  # Fix-11
