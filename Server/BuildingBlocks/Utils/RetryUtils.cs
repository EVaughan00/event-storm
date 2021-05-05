using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BuildingBlocks.Utils {
    public static class IEnumerableExtensions {
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }
    }

    public static class RetryUtils { 
        public static async Task<HttpStatusCode> GetStatus(Func<Task> callback, int wait = 1000) {
            var tokenSource = new CancellationTokenSource();
            var cancelToken = tokenSource.Token;

            var timeout = Task.Run(async () => {
                await Task.Delay(wait);

                tokenSource.Cancel();

                return HttpStatusCode.ServiceUnavailable;
            }, cancelToken);

            var call = Task.Run(async () => {
                try {
                    await callback();

                    return HttpStatusCode.OK;
                } catch (AggregateException ex) {
                    int code = 0;

                    foreach (var innerEx in ex.InnerExceptions) {
                        if (innerEx is HttpListenerException) {
                            code = ((HttpListenerException) innerEx).ErrorCode;
                        }
                    }

                    if (code != 0)
                        return (HttpStatusCode) code;

                    return HttpStatusCode.Ambiguous;
                } catch (Exception ex) {
                    ex.ToString();

                    return HttpStatusCode.BadRequest;
                }
            }, cancelToken);

            var tasks = new List<Task<HttpStatusCode>> { timeout, call };
            var completed = await Task.WhenAny(tasks);

            return await completed;
        }
    }
}