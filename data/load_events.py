import json
from pprint import pprint


def main(file_name):
	with open(file_name) as data_file:    
		data = json.load(data_file)

	pprint(data)

if __name__ == "__main__":
	main('events.json')
