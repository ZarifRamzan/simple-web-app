import csv
import os

# Paths
db_path = os.path.expanduser('~/web-app/db')
txt_file_path = os.path.join(db_path, 'user.txt')
csv_file_path = os.path.join(db_path, 'user.csv')

# Check if user.txt exists
if not os.path.exists(txt_file_path):
    print('user.txt not found!')
    exit(1)

# Read user.txt and convert to user.csv
with open(txt_file_path, 'r') as txt_file:
    lines = txt_file.readlines()

# Skip header and create a list of user data
users = []
for line in lines[1:]:  # Skip header
    name, age = line.strip().split(',')
    users.append([name.strip(), int(age.strip())])

# Write to user.csv
with open(csv_file_path, 'w', newline='') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(['Name', 'Age'])  # Write header
    writer.writerows(users)

print('Converted user.txt to user.csv successfully.')

