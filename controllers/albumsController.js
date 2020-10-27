const router = require('express').Router();
const Album = require('../models/album').Album;
const Song = require('../models/album').Song;
// NEW Album FORM
router.get('/new', (req, res) => {
  res.render('albums/new.ejs');
});

// ALL Albums INDEX
router.get('/', (req, res) => {
    User.find({}, (error, albums) => {
      res.render('albums/index.ejs', { albums });
    });
  });


// ADD EMPTY FORM TO USER SHOW PAGE TO ADD Song TO A Album
router.get('/:userId', (req, res) => {
    // find user in db by id and add new tweet
    Album.findById(req.params.userId, (error, user) => {
      res.render('albums/show.ejs', { albums });
    });
  });

  router.post('/', (req, res) => {
   Album.create(req.body, (error, album) => {
      res.redirect(`/albums/${album.id}`);
    });
  });

  // CREATE TWEET EMBEDDED IN USER
router.post('/:userId/songs', (req, res) => {
    console.log(req.body);
    // store new tweet in memory with data from request body
    const newSong = new Song({ songText: req.body.songText });
    // find user in db by id and add new tweet
    Album.findById(req.params.userId, (error, user) => {
      album.songs.push(newSong);
      album.save((err, album) => {
        res.redirect(`/albums/${user.id}`);
      });
    });
  });


  router.get('/:userId/songs/:songId/edit', (req, res) => {
    // set the value of the user and tweet ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find user in db by id
    Album.findById(albumId, (err, foundUser) => {
      // find tweet embedded in user
      const foundSong = foundAlbum.songs.id(songId);
      // update tweet text and completed with data from request body
      res.render('songs/edit.ejs', { foundAlbum, foundSong });
    });
  });
  // UPDATE TWEET EMBEDDED IN A USER DOCUMENT
  router.put('/:albumId/songs/:songId', (req, res) => {
    console.log('PUT ROUTE');
    // set the value of the user and tweet ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find user in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // find tweet embedded in user
      const foundSong = foundAlbum.songs.id(songId);
      // update tweet text and completed with data from request body
      foundSong.songText = req.body.songText;
      foundAlbum.save((err, savedAlbum) => {
        res.redirect(`/albums/${foundAlbum.id}`);
      });
    });
  });
  router.delete('/:albumId/songs/:songId', (req, res) => {
    console.log('DELETE TWEET');
    // set the value of the user and tweet ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find user in db by id
    Album.findById(songId, (err, foundUser) => {
      // find tweet embedded in user
      foundAlbum.songs.id(songId).remove();
      // update tweet text and completed with data from request body
      foundAlbum.save((err, savedAlbum) => {
        res.redirect(`/albums/${foundAlbum.id}`);
      });
    });
  });
module.exports = router;