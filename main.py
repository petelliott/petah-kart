import subprocess


def webErr(out):
    print("#### WEB ####")
    print(out)
    print("#### END ####")


def gameErr(out):
    print("$$$$ GAME $$$$")
    print(out)
    print("$$$$ END $$$$")


web = subprocess.Popen(["python3", "web"])
game = subprocess.Popen(
    ["python3", "gameserver", "/home/jacob/Desktop"])
try:
    input()
except KeyboardInterrupt:
    pass


web.terminate()
game.terminate()
