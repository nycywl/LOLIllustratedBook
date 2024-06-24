namespace LOLIllustratedBook.Models
{
    // 定義 ErrorViewModel 類別，用於表示錯誤視圖模型。
    public class ErrorViewModel
    {
        // 定義 RequestId 屬性，可為 null 的字串型別，用於保存錯誤請求的唯一識別碼。
        public string? RequestId { get; set; }

        // 定義只讀屬性 ShowRequestId，返回布林值，指示是否應該顯示 RequestId。
        // 如果 RequestId 不為空或空字串，則返回 true；否則返回 false。
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
