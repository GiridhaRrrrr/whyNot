const express = require('express');
const router = express.Router({ mergeParams: true });
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

let wrapAsync = require("../utils/wrapAsyncFunction.js");
const { isLoggedIn, validateAnswer} = require('../utils/middleware.js');
let answerController = require('../controllers/answer.js');

// new answer
router.get('/',isLoggedIn, wrapAsync(answerController.newAnswer));

// create answer
router.post('/',isLoggedIn,
    upload.single("answer[img]"), 
    validateAnswer,
     wrapAsync(answerController.postNewAnswer));



// edit answer
router.get('/:ansId',isLoggedIn, wrapAsync(answerController.editAnswer));

// update answer
router.put('/:ansId',isLoggedIn, upload.single("answer[img]"), validateAnswer, wrapAsync(answerController.postEditedAnswer));


// delete answer
router.delete('/:ansId',isLoggedIn, wrapAsync(answerController.deleteAnswer));

// dislike answer
router.post("/:ansId/:userId/disLike", isLoggedIn, wrapAsync(answerController.disLike));

router.post("/:ansId/:userId/like", isLoggedIn, wrapAsync(answerController.like));


module.exports = router;