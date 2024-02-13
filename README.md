# MSE218 Knowledge Engine

## How to run
0. run the following in a terminal **_ideally_** on a Linux or using WSL
	- If you are on **Windows**, skip step 1, 2, and 5. You will also have to install npm some other way
 		- also for **Windows**, for step 6 and 7 do `setup.bat` and `run.bat` instead
	- If you are on a **Mac**, skip step 1 and do `brew install npm tmux` instead of step 2
		- if brew is not installed on **Mac**, you will have to install it or install npm some other way
1. `sudo apt update && sudo apt upgrade -y`
2. `sudo apt install npm`
3. `git clone https://github.com/EpicStuff/MSE218.git`
4. `cd MSE218`
5. `chmod +x setup.sh run.sh`
6. `./setup.sh`
7. `./run.sh`

- Once you have run everything once successfully, you only need to run `./run.sh` to start the server again
