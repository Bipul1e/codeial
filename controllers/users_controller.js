const User = require('../models/user');


module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile',{
                    title:"user profile",
                    user: user
                })
            }
            return res.redirect('/users/sign-in');
        });
    }else{
        return res.redirect('/users/sign-in');
    }

    }
   
// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    console.log(req.body);
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if (!user){
            const newUser = await User.create(req.body);
            return res.redirect('/user/sign-in');
        } else {
            return res.redirect('/user/sign-in');
        }
    } catch (err) {
        console.log('error in signing up:', err);
    }
}


// sign in and create a session for the user
module.exports.createSession =async function(req, res){

    // steps to authenticate
    // find the user
  const user=await  User.findOne({email: req.body.email})
        // , function(err, user){
        // if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        console.log(user)
        if (user){

            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');

        }else{
            // handle user not found

            return res.redirect('back');
        }


    // });

 
    return res.redirect('/');
}
    

    
