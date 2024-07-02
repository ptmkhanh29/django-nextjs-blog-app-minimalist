import pyrebase

firebase_config = {
    "apiKey": "AIzaSyBnriUseXRQ5hS392WwWunaApIr7qQEYMM",
    "authDomain": "django-nextjs-blog-app.firebaseapp.com",
    "databaseURL": "",
    "projectId": "django-nextjs-blog-app",
    "storageBucket": "django-nextjs-blog-app.appspot.com",
    "messagingSenderId": "451829933943",
    "appId": "1:451829933943:web:d81d38a59b3be4640aa372",
    "measurementId": "G-79D5HG02RG"
}

firebase = pyrebase.initialize_app(firebase_config)
storage = firebase.storage()

def upload_image_to_firebase(article, local_path, file_name):
    path_on_cloud = f"{article}/{file_name}"
    try:
        url = storage.child(path_on_cloud).get_url(None)
        return url
    except:
        storage.child(path_on_cloud).put(local_path)
        return storage.child(path_on_cloud).get_url(None)