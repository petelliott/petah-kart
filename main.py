import subprocess

web = subprocess.Popen(["python3", "web"])
game = subprocess.Popen(
    ["python3", "gameserver", "maps"])
subprocess.Popen(
    ["http", "POST", "localhost:8888/new", "map=Map0.json", "player_count=3"])

try:
    input()
except KeyboardInterrupt:
    pass


web.terminate()
game.terminate()
