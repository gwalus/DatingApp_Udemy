namespace DatingApp.API.Helpers
{
    public class MessageParams
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize =  (value > maxPageSize) ? maxPageSize : value; } // jeśli ktoś poprosi o więcej niż 50 użytkowników i tak ich nie dostanie
        }

        public int UserId { get; set; }
        public string MessageContainer { get; set; } = "Unread";
    }
}