from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

# Authenticate and create GoogleDrive instance
gauth = GoogleAuth()
gauth.LocalWebserverAuth()  # Will open a browser window to authenticate
drive = GoogleDrive(gauth)

# # Replace 'FILE_PATH' with the local path to the .pkl file you want to upload
# file_path = 'FILE_PATH'

# # Create a file on Google Drive
# file_drive = drive.CreateFile()

# # Set the file name on Google Drive
# file_drive['title'] = 'uploaded_file.pkl'

# # Set the parent folder ID (if necessary)
# # file_drive['parents'] = [{'id': 'PARENT_FOLDER_ID'}]

# # Upload the file
# file_drive.SetContentFile(file_path)
# file_drive.Upload()
