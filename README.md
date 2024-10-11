# Express backend luominen

- forkkasin express sequelize https://github.com/Es-Esa/nodejs-express-sequelize-mysql
- redux-toolkit-example-crud-hooks https://github.com/Es-Esa/redux-toolkit-example-crud-hooks






## Express asennus

- npm intall

- tietokanna luonti.

- tietokkanna konfigurointi jotta toimii expressin kanssa:

```
module.exports = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "toor",
  DB: "tutorials",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```


## redux_react frontin asennus

- npm install


## backendin rakentaminen jotta se voi käsitellä kommentteja

- modelien ja controllerin luonti

- comments.model.js luonti jotta sequelize pystyy luomaan kommentikentät tietokantaan.
- tutorial.model.js muutos jotta suhde on "yhden suhde moneen"

```
 Tutorial.associate = function (models) {
    Tutorial.hasMany(models.Comment, { as: 'comments' });
  };
```

- index.js tehty muutoksia jotta se osaa ajaa sen scriptin sinne tietokantaan.


- comment.controller.js luonti.

> Tämän controllerin tehtävä on luoda ja hakea tietokannasta kommentit.
> Katso tarkemmin kommentit tiedostosta.



## Routes muokkaus


Lisätty reitit Api rajapintaan.

```
// Route for creating a comment
  router.post('/comments/:tutorialId', comments.create);

// Route for fetching all comments for a tutorial
  router.get('/comments/:tutorialId', comments.findAll);
```



## testaus

Tietokanta toimii ja palauttaa sinne manauaalisesti lisätyt kommentit.



---




# Front end Redux, react front

- Loin /service/commentservice.js

> Tämä sisältää axio kutsun joka käsittelee funktioita.
> Funktiot lisäävät kommentteja tai hakee kaikki kommentit tietokannasta.

- Loin /slice/comments.js

> Tämä sisältää createSlice ja  createAsyncThunk funktiot, createSlice luo uuden slice-olion, se sisältää reducerit ja action creators. Taas createAsyncThunk luo uuden thunkin, joka käsittelee asynkronisisa toimintoja.

- Päivitin /store/store.js

> Jossa lisäsin importin slices/comments ja päivitin reducer muuttujan 
> comments: commentsReducer



- Loin components/AddComments.js

> Tämä on komponentti joka lisää uuden komponentin.

- Tein muutosta Tutorial.js

Importasin `import { createComment, retrieveComments } from "../slices/comments"; `

Lisäsin uuden tila   `const [newComment, setNewComment] = useState(""); // tämä on uusi tila kommentille joka lisätään tutoriaaliin`

Käytetään dispatch funktiota Reduxin action creatorien kutsumiseenconst`dispatch = useDispatch();`

Haetaan kommentit statesta `const comments = useSelector(state => state.comments || []);` 

Käytetään hook joka hakee tutoriaalit ja kommentit kun sivu alkaa

```
  useEffect(() => {
    const getTutorial = id => {
      TutorialDataService.get(id)
        .then(response => {
          setCurrentTutorial(response.data);
          console.log(" ID tutoriaaliin:", id); // debugausta
          dispatch(retrieveComments(id)); // hakee kommentit tutoriaalille kun tutoriaali on haettu
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    if (id) {
      getTutorial(id);
    }
  }, [id, dispatch]);
```


Käsitellään kemmentien muutos input-ketässä ja päivitetään se newComment tilaan. 

```
const handleCommentChange = event => {
    setNewComment(event.target.value); 
  };
```


Määritetään kommenttien lisäsys funktio

```
const addComment = () => {
    if (newComment.trim()) { // tarvitaa onko kommentti tyhjä, jos ei niin lisätään kommentti
      dispatch(createComment({ tutorialId: currentTutorial.id, text: newComment }))
        .unwrap()
        .then(() => {
          setNewComment(""); // tyhjentää input-kentän
          setMessage("Comment added successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
```


  Lisätään tarvittavat html tagit

```
  <h4>Comments</h4>
          <ul>
            {comments.length > 0 ? (
              comments.map(comment => (
                <li key={comment.id}>{comment.text}</li>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </ul>

          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
          <button onClick={addComment} className="badge badge-success">
            Add Comment
          </button>
```


## Debugaus

Jostain syystä Apista tuleva data toimi, mutta sliceri ei ottanut dataa muuttujiin.
Ongelma oli retriceCommentssa, korjasin kun tein async funktion samalalla tavalla kuin tutorial.js
Siksi löytyy paljon debugausta.


### Puppetter

Luovutin tämän suhteen, en saanut toimimaan. Virheitä virheiden perään. 
```
 FAIL  src/tests/addComment.test.js
  ● Test suite failed to run

    Cannot find module 'puppeteer-core/internal/puppeteer-core.js' from 'node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js'

    Require stack:
      node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js
      src/tests/addComment.test.js

      at Resolver.resolveModule (node_modules/jest-resolve/build/resolver.js:324:11)
      at Object.<anonymous> (node_modules/puppeteer/src/puppeteer.ts:9:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.725 s
```

ei löydä tätä moduulia, vaikka yrittäisin asentaa globaalisti, tai poistin koko node_moduulit ja asensin uudestaan. Mikään ei auttanut..

https://hackmd.io/@web2/rk1xDYLk1x









__________________________________________________________________________________________

# Redux-Toolkit CRUD example with React Hooks, Axios & Web API
Build Redux-Toolkit CRUD application with React Hooks and Rest API calls in that:
- Each item has id, title, description, published status.
- We can create, retrieve, update, delete items.
- There is a Search bar for finding items by title.

![redux-toolkit-crud-hooks-example](redux-toolkit-crud-hooks-example.png)

Redux Store:

![redux-toolkit-crud-hooks-example-redux-store-architecture](redux-toolkit-crud-hooks-example-redux-store-architecture.png)

For instruction, please visit:
> [Redux-Toolkit CRUD example with React Hooks, Axios & Web API](https://www.bezkoder.com/redux-toolkit-crud-react-hooks/)

More Practice:
> [React Hooks + Redux (without Redux-Toolkit) CRUD example with Axios & Web API](https://www.bezkoder.com/react-hooks-redux-crud/)

> [React Hooks (without Redux) CRUD example with Axios and Web API](https://www.bezkoder.com/react-hooks-crud-axios-api/)

> [React Table example: CRUD App with react-table v7](https://www.bezkoder.com/react-table-example-hooks-crud/)

> [React Pagination using Hooks example](https://www.bezkoder.com/react-pagination-hooks/)

> [React Hooks File Upload example](https://www.bezkoder.com/react-hooks-file-upload/)

> [React Hooks: JWT Authentication & Authorization example](https://www.bezkoder.com/react-hooks-jwt-auth/)

> [React + Redux + Hooks: JWT Authentication & Authorization example](https://www.bezkoder.com/react-hooks-redux-login-registration-example/)

Fullstack with Node.js Express:
> [React + Node.js Express + MySQL](https://www.bezkoder.com/react-node-express-mysql/)

> [React + Node.js Express + PostgreSQL](https://www.bezkoder.com/react-node-express-postgresql/)

> [React + Node.js Express + MongoDB](https://www.bezkoder.com/react-node-express-mongodb-mern-stack/)

Fullstack with Spring Boot:
> [React + Spring Boot + MySQL](https://www.bezkoder.com/react-spring-boot-crud/)

> [React + Spring Boot + PostgreSQL](https://www.bezkoder.com/spring-boot-react-postgresql/)

> [React + Spring Boot + MongoDB](https://www.bezkoder.com/react-spring-boot-mongodb/)

Fullstack with Django:
> [React.js Hooks + Django Rest Framework](https://www.bezkoder.com/django-react-hooks/)

Serverless with Firebase:
> [React Firebase Hooks: CRUD App with Realtime Database example](https://www.bezkoder.com/react-firebase-hooks-crud/)

> [React Hooks Firestore example: CRUD App](https://www.bezkoder.com/react-hooks-firestore/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Set port
.env
```
PORT=8081
```

## Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.
