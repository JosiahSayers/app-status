import app from './app';

app.listen(app.get('port'), () => console.log(`Server stared on port ${app.get('port')}`));
