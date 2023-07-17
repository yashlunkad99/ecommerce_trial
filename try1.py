from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import gdown
import pickle
import pandas as pd
import sys

# Authenticate and create GoogleDrive instance
gauth = GoogleAuth()
drive = GoogleDrive(gauth)

# # Replace 'FILE_ID' with the file ID of the pickle file in Google Drive
# file_id = 'FILE_ID'

# # Get the file object using the file ID
# file_obj = drive.CreateFile({'id': file_id})

# # Download the pickle file as a temporary file
# temp_file_path = '/tmp/similarity.pkl'  # Change the path as needed
# file_obj.GetContentFile(temp_file_path)

# # Load the pickled similarity matrix
# with open(temp_file_path, 'rb') as file:
#     similarity = pickle.load(file)

# # Remove the temporary file
# file_obj.Delete()

# # Load the CSV file
# new = pd.read_csv("neww.csv")

# # Define the function to retrieve similar movie IDs
# def recommend(movie):
#     index = new[new['name'] == movie].index[0]
#     distances = sorted(enumerate(similarity[index]), reverse=True, key=lambda x: x[1])
#     similar_ids = [new.iloc[i[0]]._id for i in distances[1:5]]
#     return similar_ids

# # Example usage
# movie_name = str(sys.argv[1])
# similar_ids = recommend(movie_name)
# print(similar_ids)
'''