using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T: class; // dzięki takiemu podejściu możemy wykorzystać to do dodania nowego użytkownika i zarazem nowych zdjęć
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll(); // zadanie będzie zwracać czy udało się zapisać czy też nie
         Task<IEnumerable<User>> GetUsers();    // zadanie będzie zwracało kolekcję użytkowników
         Task<User> GetUser(int id);
    }
}