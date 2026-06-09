import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("firebase.json")

firebase_admin.initialize_app(cred)

def verify_firebase_token(token:str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None