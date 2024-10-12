import db from '../database/db.js'
//registro
export const register = ({ nombre, email, contraseña}) => db('INSERT INTO usuarios (id, nombre, email, contraseña) VALUES (DEFAULT, $1, $2, $3);', [nombre, email, contraseña ]);
//login
export const login = ({ email}) => db('SELECT email, contraseña FROM usuarios WHERE email=$1;',[email]);
//buscar
export const findProfile = ({ email }) => { 
    return db.query('SELECT * FROM usuarios WHERE email = $1',[email]);
};
//eliminar
export const deleteProfile = (id) => { 
    return db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *;',[id]);
};
//actualizar
export const updateProfile = (id, updateData) => { 
    const { nombre, email, contraseña } = updateData; 
    return db.query('UPDATE usuarios SET nombre =$2, email=$3, contraseña=$4 WHERE id=$1 RETURNING *',
         [id, nombre, email, contraseña]
    );
};