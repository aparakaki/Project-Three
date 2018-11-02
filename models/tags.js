module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Tag.associate = function(models) {
        Tag.belongsTo(models.Deck, {
            foreignKey: "deckId",
            onDelete: "cascade"
        });
    };

    return Tag;
}