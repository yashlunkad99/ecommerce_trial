import pickle
import pandas as pd
import sys
import zipfile
import pickle
new = pd.read_csv("neww.csv")

# # Load the pickled similarity matrix
# with gzip.open('D:\AfourProject\ecommerceWebsite-app\client\src\pages\similarity', 'rb') as file:
#     similarity = pickle.load(file)
# Specify the path to the ZIP file

zip_file_path = 'similarity.zip'
pkl_file_name = 'similarity.pkl'

with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
    with zip_ref.open(pkl_file_name) as pkl_file:
        similarity = pickle.load(pkl_file)

# Define the function to retrieve similar movie IDs
def recommend(movie):
    index = new[new['name'] == movie].index[0]
    distances = sorted(enumerate(similarity[index]), reverse=True, key=lambda x: x[1])
    similar_ids = [new.iloc[i[0]]._id for i in distances[1:5]]
    return similar_ids

# Example usage
movie_name = str(sys.argv[1])
similar_ids = recommend(movie_name)
print(similar_ids)
