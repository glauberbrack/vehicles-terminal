export default class Vehicle {
  constructor({ id, types, kmTraveled, from, to }) {
    this.id = id;
    this.types = types;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split("-").map(Number);

      // js months always start on zero, so we need to normalize it
      const normalizedMonth = month - 1;
      return new Date(year, normalizedMonth, day);
    };

    return {
      id: Number(this.id),
      types: new Intl.ListFormat(language, {
        style: "long",
        type: "conjunction",
      }).format(this.types),
      kmTraveled: new Intl.NumberFormat(language, {
        style: "unit",
        unit: "kilometer",
      }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.to)),
    };
  }

  static generateInstanceFromString(text) {
    const EMPTY_SPACE = " ";
    const [id, types, kmTraveled, from, to] = text.split(EMPTY_SPACE);
    const vehicles = new Vehicle({
      id,
      kmTraveled,
      from,
      to,
      types: types.split(","),
    });

    return vehicles;
  }
}
