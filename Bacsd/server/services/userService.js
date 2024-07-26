const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Créer un nouvel utilisateur
module.exports.createUser = async (serviceData) => {
  try {
    // Vérifier si l'email existe déjà
    const user = await User.findOne({ email: serviceData.email });
    if (user) {
      throw new Error("Email already exists");
    }

    // Hasher le mot de passe
    const hashPassword = await bcrypt.hash(serviceData.password, 12);

    // Créer un nouvel utilisateur
    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
    });

    // Sauvegarder l'utilisateur
    let result = await newUser.save();

    return result;
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message); // Utilisez error.message pour un message d'erreur plus précis
  }
};

// Récupérer le profil de l'utilisateur
module.exports.getUserProfile = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split("Bearer ")[1] // Assurez-vous d'avoir un espace après Bearer
      .trim();
    const decodedJwtToken = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY || "default-secret-key"
    ); // Utilisez verify pour vérifier la signature
    const user = await User.findOne({ _id: decodedJwtToken.id });

    if (!user) {
      throw new Error("User not found!");
    }

    return user.toObject();
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};

// Connexion d'un utilisateur
module.exports.loginUser = async (serviceData) => {
  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      throw new Error("User not found!");
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password);

    if (!isValid) {
      throw new Error("Password is invalid");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "default-secret-key",
      { expiresIn: "1d" }
    );

    return { token };
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};

// Mettre à jour le profil de l'utilisateur
module.exports.updateUserProfile = async (serviceData) => {
  try {
    const jwtToken = serviceData.headers.authorization
      .split("Bearer ")[1] // Assurez-vous d'avoir un espace après Bearer
      .trim();
    const decodedJwtToken = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY || "default-secret-key"
    ); // Utilisez verify pour vérifier la signature
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName,
      },
      { new: true, useFindAndModify: false } // Ajoutez useFindAndModify: false ici
    );

    if (!user) {
      throw new Error("User not found!");
    }

    return user.toObject();
  } catch (error) {
    console.error("Error in userService.js", error);
    throw new Error(error.message);
  }
};
