import json
import os

# Paths
db_path = os.path.expanduser('~/web-app/db')
txt_file_path = os.path.join(db_path, 'user.txt')
json_file_path = os.path.join(db_path, 'user.json')

# Check if user.txt exists
if not os.path.exists(txt_file_path):
    print('user.txt not found!')
    exit(1)

# Read user.txt and convert to user.json
with open(txt_file_path, 'r') as txt_file:
    lines = txt_file.readlines()

# Skip header and create a list of dictionaries
users = []
for line in lines[1:]:  # Skip header
    name, age = line.strip().split(',')
    users.append({'name': name.strip(), 'age': int(age.strip())})

# Write to user.json
with open(json_file_path, 'w') as json_file:
    json.dump(users, json_file, indent=4)

print('Converted user.txt to user.json successfully.')

