import chefModel from "./chefModel.js"
import receitasModel from "./receitasModel.js"


chefModel.belongsToMany(receitasModel, {
    through: 'autores_receitas',
    foreignKey: 'autor_id',
    otherKey: 'receita_id'
})

receitasModel.belongsToMany(chefModel, {
    through: 'autores_receitas',
    foreignKey: 'receita_id',
    otherKey: 'autor_id'
})

export { chefModel, receitasModel }
