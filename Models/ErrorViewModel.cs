namespace LOLIllustratedBook.Models
{
    // �w�q ErrorViewModel ���O�A�Ω��ܿ��~���ϼҫ��C
    public class ErrorViewModel
    {
        // �w�q RequestId �ݩʡA�i�� null ���r�ꫬ�O�A�Ω�O�s���~�ШD���ߤ@�ѧO�X�C
        public string? RequestId { get; set; }

        // �w�q�uŪ�ݩ� ShowRequestId�A��^���L�ȡA���ܬO�_������� RequestId�C
        // �p�G RequestId �����ũΪŦr��A�h��^ true�F�_�h��^ false�C
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
