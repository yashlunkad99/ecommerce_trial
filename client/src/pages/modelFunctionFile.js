import { PythonShell } from "python-shell";

// Set the path to your pickle file
const pickleFilePath = "client/src/pages/similarity.pkl";

// Define the Python script to load and extract the model result
const pythonScript = `
import pickle

# Load the pickle file
with open('${pickleFilePath}', 'rb') as file:
    model_result = pickle.load(file)

# Define the add function
def add(movie):
  index = new[new['name'] == movie].index[0]
  distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
  for i in distances[1:6]:
    print(new.iloc[i[0]]._id)

# Call the add function with input arguments
result = add(${ClickedProductsSingle})

# Print the model result and the result of the add function
print('Model Result:', model_result)
print('Add Result:', result)
`;

// Set the input arguments for the add function
const ClickedProductsSingle = auth?.user?.ClickedProducts; // pass only one value.

// Execute the Python script
PythonShell.runString(pythonScript, null, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    const [modelResult, addResult] = result;
    console.log("Model Result:", modelResult);
    console.log("Add Result:", addResult);
  }
});
