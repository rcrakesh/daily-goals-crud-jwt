const express = require('express');
const router = express.Router();
const { getGoals , setGoals , updateGoals ,deleteGoals  } = require('../controller/goalController');
const { protect } = require('../middleware/authMiddleware')
// router.get('/',(req , res)=>{
//     res.status(200).json({
//         message : "get goals",
//     })
// })
// -----------------------------------------------

// router.get('/', getGoals)
// router.post('/', setGoals)

router.route('/').get(protect,getGoals).post(protect,setGoals)

// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)

router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)


module.exports = router;