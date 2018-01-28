import subprocess

web = subprocess.Popen(["python3", "web"], stdout=subprocess.PIPE)
game = subprocess.Popen(["python3", "gameserver"], stdout=subprocess.PIPE)
try:
    input()
except KeyboardInterrupt:
    pass


web.terminate()
game.terminate()