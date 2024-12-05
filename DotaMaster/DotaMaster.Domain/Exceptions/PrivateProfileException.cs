using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Domain.Exceptions
{
    public class PrivateProfileException: Exception
    {
        // Конструктор с сообщением
        public PrivateProfileException(string message)
            : base(message)
        {
        }

        // Конструктор с сообщением и внутренним исключением
        public PrivateProfileException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
