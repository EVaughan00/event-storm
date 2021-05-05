using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace BuildingBlocks.SeedWork
{
    public abstract class Enumeration : IComparable
    {
        public string Name { get; private set; }

        public int Id { get; private set; }

        protected Enumeration(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public override string ToString() => Name;

        public static T FromName<T>(string name) where T: Enumeration
        {
            var list = GetAll<T>();
            var state = list.SingleOrDefault(s => String.Equals(s.Name, name, StringComparison.CurrentCultureIgnoreCase));

            if (state == null)
            {
                throw new Exception($"Possible values for {typeof(T).Name}: {String.Join(", ", list.Select(s => s.Name))}");
            }

            return (T) state;
        }

        public static T From<T>(int id) where T: Enumeration
        {
            var list = GetAll<T>();
            var state = list.SingleOrDefault(s => s.Id == id);

            if (state == null)
            {
                throw new Exception($"Possible values for {typeof(T).Name}: {String.Join(", ", list.Select(s => s.Name))}");
            }

            return (T) state;
        }

        public static IEnumerable<T> GetAll<T>() where T : Enumeration
        {
            var fields = typeof(T).GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly);
            var props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly);

            var list = new List<T>();
            var fieldT = fields.Select(f => f.GetValue(null)).Cast<T>().ToList();
            var propsT = props.Select(f => f.GetValue(null)).Cast<T>().ToList();

            fieldT.ForEach(field => { if (!list.Contains(field)) list.Add(field); });
            propsT.ForEach(prop => { if (!list.Contains(prop)) list.Add(prop); });

            return list;
        }

        public override bool Equals(object obj)
        {
            var otherValue = obj as Enumeration;

            if (otherValue == null)
                return false;

            var typeMatches = GetType().Equals(obj.GetType());
            var idMatches = Id.Equals(otherValue.Id);
            var nameMatches = Name.Equals(otherValue.Name);

            return typeMatches && idMatches && nameMatches;
        }

        public override int GetHashCode() => Id.GetHashCode();

        public static int Difference(Enumeration firstValue, Enumeration secondValue)
        {
            var difference = Math.Abs(firstValue.Id - secondValue.Id);
            return difference;
        }

        private static T Parse<T, K>(K value, string description, Func<T, bool> predicate) where T : Enumeration
        {
            var matchingItem = GetAll<T>().FirstOrDefault(predicate);

            if (matchingItem == null)
                throw new InvalidOperationException($"'{value}' is not a valid {description} in {typeof(T)}");

            return matchingItem;
        }

        public int CompareTo(object other) => Id.CompareTo(((Enumeration)other).Id);
    }
}