import chefeModel from "./chefeModel.js"
import receitasModel from "./receitasModel.js"


chefeModel.belongsToMany(receitasModel, {
    through: 'autores_receitas',
    foreignKey: 'autor_id',
    otherKey: 'receita_id'
})

receitasModel.belongsToMany(chefeModel, {
    through: 'autores_receitas',
    foreignKey: 'receita_id',
    otherKey: 'autor_id'
})

export { chefeModel, receitasModel }
