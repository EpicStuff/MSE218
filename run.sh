cd backend
tmux new-session -d -s backend 'npm run start'
cd ..
cd frontend
tmux new-session -d -s frontend 'npm run start'