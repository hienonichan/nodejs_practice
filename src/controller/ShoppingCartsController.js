const User=require('../models/userModel')
const Course=require('../models/courseModel')

class ShoppingCartsController{
    //GET /shopping-carts
   async show(req,res,next){
    try {
        // path là đường dẫn cần populate
        const user=await User.findById(req.user._id).populate({path:'shoppingCarts.product'})
        const arrayCart=user.shoppingCarts
        const arrayCartData=arrayCart.map(object=>object=object.toObject())
         res.render('shopping-carts',{cart:arrayCartData})
    } catch (error) {
        next(error)
    }
   }

  //POST /shopping-carts/:id
   async push(req,res,next){
      try {
        let array=req.user.shoppingCarts
        let object
        for(let i=0;i<array.length;i++){
         if(array[i].product.toString()===req.params.id){
            object=array[i]
            break
         }
        }
        if(object){
         for(let i=0;i<array.length;i++){
            if(array[i].product.toString()==req.params.id){
               let oldQuantity=array[i].quantity
               array[i].quantity=oldQuantity+1
            }
         }
        }
        else{
          array.push({product:req.params.id,quantity:1})
        }
        await User.findByIdAndUpdate(req.user._id,{shoppingCarts:array})
        res.redirect('/home')
      } catch (error) {
        next(error)
      }
   }
   //PUT /shopping-carts/:id
   async pop(req,res,next){
      try {
         let array=req.user.shoppingCarts
         for(let index=0;index<array.length;index++){
            if(array[index].product.toString()===req.params.id){
              array.splice(index,1)
              break
            }
         }
         await User.findByIdAndUpdate(req.user._id,{shoppingCarts:array})
         res.redirect('/shopping-carts')
      } catch (error) {
        next(error)
      }
   }
}
module.exports=new ShoppingCartsController()