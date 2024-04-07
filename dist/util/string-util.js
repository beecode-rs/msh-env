export class StringUtil {
    toSnakeCase(str) {
        return (str &&
            (str.trim().match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
                .map((x) => x.toLowerCase())
                .join('_'));
    }
    toSnakeUpperCase(str) {
        return this.toSnakeCase(str).toUpperCase();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbC9zdHJpbmctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sVUFBVTtJQUN0QixXQUFXLENBQUMsR0FBVztRQUN0QixPQUFPLENBQ04sR0FBRztZQUNILENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDNUYsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWCxDQUFBO0lBQ0YsQ0FBQztJQUVELGdCQUFnQixDQUFDLEdBQVc7UUFDM0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzNDLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTdHJpbmdVdGlsIHtcblx0dG9TbmFrZUNhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoXG5cdFx0XHRzdHIgJiZcblx0XHRcdChzdHIudHJpbSgpLm1hdGNoKC9bQS1aXXsyLH0oPz1bQS1aXVthLXpdK1swLTldKnxcXGIpfFtBLVpdP1thLXpdK1swLTldKnxbQS1aXXxbMC05XSsvZykgfHwgW10pXG5cdFx0XHRcdC5tYXAoKHgpID0+IHgudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0LmpvaW4oJ18nKVxuXHRcdClcblx0fVxuXG5cdHRvU25ha2VVcHBlckNhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLnRvU25ha2VDYXNlKHN0cikudG9VcHBlckNhc2UoKVxuXHR9XG59XG4iXX0=