import json
from pprint import pprint


def main(file_name='events.json'):
    with open(file_name) as data_file:    
        data = json.load(data_file)

    pprint(data)
	
    for ev in data['events']:
        #pprint(ev['title'])
        pprint(ev)
	return data
	

if __name__ == "__main__":
    main()
