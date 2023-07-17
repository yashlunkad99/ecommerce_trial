import pickle
import pandas as pd
import sys
new = pd.read_csv("neww.csv")

# Load the pickled similarity matrix
with open('D:\AfourProject\ecommerceWebsite-app\client\src\pages\similarity.pkl', 'rb') as file:
    similarity = pickle.load(file)

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
