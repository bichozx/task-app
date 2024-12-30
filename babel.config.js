module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Transformar módulos ECMAScript
    '@babel/plugin-proposal-private-methods', // Opcional: para manejar métodos privados si los estás usando
    '@babel/plugin-proposal-private-property-in-object', // Opcional: para manejar propiedades privadas en objetos
  ],
};
