import json

# Get user input
user_input = input("Enter some data: ")

# Prepare data to send back
data_to_pass_back = {'data_returned': 'Send this to Node.js.', 'user_input': user_input}

# Print the data as JSON to standard output
print(json.dumps(data_to_pass_back))

# import sys
# import json
# import ast
# data_to_pass_back = 'Send this to node process.'

# input = ast.literal_eval(sys.argv[1])
# output = input
# output['data_returned'] = data_to_pass_back
# print(json.dumps(output))

# sys.stdout.flush()


# on the server we want to pass in inputs
# easiest way to



# high level
# figure out how to pass in things from the front end to the backend
# use http to pass things from front end to backend
# have the backend take that, run a child process, then run a python script from that


