import express from 'express';
import axios from 'axios';
import path from 'path';

var router = express.Router();

router.post('/', (req, res, next) => {
  console.log(req.path,req.body);
  const auth_url = new URL(
    path.join('.',req.baseUrl,'callback'),
    req.protocol+'://'+req.get('host')
  );
  auth_url.searchParams.append('me',req.body.uid);
  console.log(auth_url);
  res.redirect(auth_url);
});

router.get('/callback', (req, res, next) => {
  res.json(req.query);
});


export default router;
