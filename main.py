import subprocess
import platform
import requests

try:
    if platform.system() == "Windows":
        web = subprocess.Popen(["python", "web"])
        game = subprocess.Popen(["python", "gameserver", "maps"])
        r = requests.post("http://localhost:8888/new", json={'map': 'Map0.json', 'player_count': '3'})
        print(r.text)
    else:
        web = subprocess.Popen(["python3", "web"])
        game = subprocess.Popen(["python3", "gameserver", "maps"])
        subprocess.Popen(["http", "POST", "localhost:8888/new", "map=Map0.json", "player_count=3"])
    input()
except KeyboardInterrupt:
    pass
except BaseException as error:
    print("An exception occurred: {}".format(error))
    raise error
finally:
    web.terminate()
    game.terminate()
