export const citiesInSpain = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas de Gran Canaria", "Bilbao", "Alicante",
  "Córdoba", "Valladolid", "Vigo", "Gijón", "L'Hospitalet de Llobregat", "La Coruña", "Granada", "Vitoria", "Elche", "Santa Cruz de Tenerife",
  "Oviedo", "Badalona", "Cartagena", "Terrassa", "Jerez de la Frontera", "Sabadell", "Móstoles", "Alcalá de Henares", "Pamplona", "Fuenlabrada",
  "Almería", "Leganés", "San Sebastián", "Castellón de la Plana", "Burgos", "Albacete", "Santander", "Getafe", "Alcorcón", "San Cristóbal de La Laguna",
  "Logroño", "Badajoz", "Huelva", "Salamanca", "Marbella", "Lérida", "Tarragona", "Dos Hermanas", "Torrejón de Ardoz", "Parla", "Mataró", "León",
  "Algeciras", "Santa Coloma de Gramenet", "Alcobendas", "Cádiz", "Jaén", "Orense", "Reus", "Telde", "Baracaldo", "Lugo", "Girona", "Coslada",
  "Talavera de la Reina", "El Puerto de Santa María", "Cornellá de Llobregat", "Avilés", "Palencia", "Gandía", "Zamora", "Pontevedra", "Alcalá de Guadaíra",
  "San Fernando", "Ceuta", "Guadalajara", "Toledo", "Manresa", "Ciudad Real", "Cáceres", "Cuenca", "Sant Cugat del Vallès", "Jaén", "Benidorm",
  "Pozuelo de Alarcón", "Mollet del Vallès", "Paterna", "Zaragoza", "Manresa", "Torrent", "Majadahonda", "Andújar", "Rivas-Vaciamadrid", "Fuengirola",
  "Orihuela", "Mérida", "Linares", "Mijas", "San Sebastián de los Reyes", "Villanueva y Geltrú", "El Ejido", "Molina de Segura", "Gáldar", "Sant Boi de Llobregat",
  "Torrevieja", "Vélez-Málaga", "Vic", "Figueras", "Ibiza", "Reus", "Las Rozas de Madrid", "Elda", "Coslada", "Granollers", "Villarreal", "Santa Lucía de Tirajana",
  "Cáceres", "Ponferrada", "Estepona", "Torrelavega", "Viladecans", "Casteldefels", "San Vicente del Raspeig", "Getafe", "Rubí", "San Fernando de Henares",
  "San Andrés del Rabanedo", "Cullera", "Lloret de Mar", "Ripollet", "Eibar", "El Prat de Llobregat", "Moralzarzal", "Villanueva de la Serena", "Alcantarilla",
  "Pájara", "Montilla", "Ejea de los Caballeros", "Vilanova i la Geltrú", "Olot", "Narón", "Sagunto", "Esplugas de Llobregat", "Gernika-Lumo",
  "Sant Vicenç dels Horts", "Ávila", "Castellar del Vallès", "Manzanares", "Guía de Isora", "Alcira", "Sant Quirze del Vallès", "Torrelodones",
  "La Orotava", "Navalcarnero", "Torrijos", "Castro-Urdiales", "Catarroja", "Palamós", "Almuñécar", "Cártama", "San Andrés y Sauces", "Ronda",
  "Burlada/Burlata", "Palma del Río", "Alcudia", "Irun", "Las Torres de Cotillas", "Onda", "Alaquàs", "San Bartolomé de Tirajana", "Sant Just Desvern",
  "Camargo", "San Roque", "Hondarribia", "Los Realejos", "Talavera de la Reina", "Gavá", "Vilagarcía de Arousa", "Marratxí", "Arucas", "Carcaixent",
  "Alcalá la Real", "Blanes", "Arona", "Begur", "Mijas", "Molins de Rei", "Icod de los Vinos", "Onda", "Puerto del Rosario", "San Andrés y Sauces",
  "Benalmádena", "Laguna de Duero", "Pérez", "La Bañeza", "La Unión", "Alagón", "Miajadas", "Quart de Poblet", "Cabra", "Astorga", "Caravaca", "Níjar",
  "La Algaba", "Moguer", "Aguilar de la Frontera", "Candelaria", "Cabra", "Osuna", "Santa María de Guía de Gran Canaria", "Carmona", "Valencia",
  "Alhaurín de la Torre", "Lucena", "Las Palmas de Gran Canaria", "Pontevedra", "Benicarló", "Sant Cugat del Vallès", "Hospitalet de Llobregat",
  "Santiago de Compostela", "Palma", "Tarragona", "Vitoria-Gasteiz", "A Coruña", "Vigo", "Elche", "Gijón", "Oviedo", "Santa Cruz de Tenerife",
  "Pamplona", "Málaga", "Sabadell", "Donostia", "Bilbao", "Murcia", "Valencia", "Sevilla", "Zaragoza"
];

export const cityValidator = (inputValue: string) => {
  for (const city of citiesInSpain) {
    if (city.toLowerCase() === inputValue.toLowerCase()) {
      return city;
    }
  }
  return false;
};
