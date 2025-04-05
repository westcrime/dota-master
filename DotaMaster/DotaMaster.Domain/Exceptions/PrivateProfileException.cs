namespace DotaMaster.Domain.Exceptions
{
    public class PrivateProfileException: Exception
    {
        public PrivateProfileException()
            : base("This profile is private!")
        {
        }
        public PrivateProfileException(string message)
            : base(message)
        {
        }
        public PrivateProfileException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
