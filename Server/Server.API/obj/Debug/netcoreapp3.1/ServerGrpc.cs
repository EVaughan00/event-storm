// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: Grpc/Server.proto
// </auto-generated>
#pragma warning disable 0414, 1591
#region Designer generated code

using grpc = global::Grpc.Core;

namespace GrpcServer {
  public static partial class ServerGrpc
  {
    static readonly string __ServiceName = "ServerGrpcApi.ServerGrpc";

    static readonly grpc::Marshaller<global::GrpcServer.ServerMessage> __Marshaller_ServerGrpcApi_ServerMessage = grpc::Marshallers.Create((arg) => global::Google.Protobuf.MessageExtensions.ToByteArray(arg), global::GrpcServer.ServerMessage.Parser.ParseFrom);
    static readonly grpc::Marshaller<global::GrpcServer.ServerActionResponse> __Marshaller_ServerGrpcApi_ServerActionResponse = grpc::Marshallers.Create((arg) => global::Google.Protobuf.MessageExtensions.ToByteArray(arg), global::GrpcServer.ServerActionResponse.Parser.ParseFrom);

    static readonly grpc::Method<global::GrpcServer.ServerMessage, global::GrpcServer.ServerActionResponse> __Method_AddServer = new grpc::Method<global::GrpcServer.ServerMessage, global::GrpcServer.ServerActionResponse>(
        grpc::MethodType.Unary,
        __ServiceName,
        "AddServer",
        __Marshaller_ServerGrpcApi_ServerMessage,
        __Marshaller_ServerGrpcApi_ServerActionResponse);

    /// <summary>Service descriptor</summary>
    public static global::Google.Protobuf.Reflection.ServiceDescriptor Descriptor
    {
      get { return global::GrpcServer.ServerReflection.Descriptor.Services[0]; }
    }

    /// <summary>Base class for server-side implementations of ServerGrpc</summary>
    [grpc::BindServiceMethod(typeof(ServerGrpc), "BindService")]
    public abstract partial class ServerGrpcBase
    {
      public virtual global::System.Threading.Tasks.Task<global::GrpcServer.ServerActionResponse> AddServer(global::GrpcServer.ServerMessage request, grpc::ServerCallContext context)
      {
        throw new grpc::RpcException(new grpc::Status(grpc::StatusCode.Unimplemented, ""));
      }

    }

    /// <summary>Creates service definition that can be registered with a server</summary>
    /// <param name="serviceImpl">An object implementing the server-side handling logic.</param>
    public static grpc::ServerServiceDefinition BindService(ServerGrpcBase serviceImpl)
    {
      return grpc::ServerServiceDefinition.CreateBuilder()
          .AddMethod(__Method_AddServer, serviceImpl.AddServer).Build();
    }

    /// <summary>Register service method with a service binder with or without implementation. Useful when customizing the  service binding logic.
    /// Note: this method is part of an experimental API that can change or be removed without any prior notice.</summary>
    /// <param name="serviceBinder">Service methods will be bound by calling <c>AddMethod</c> on this object.</param>
    /// <param name="serviceImpl">An object implementing the server-side handling logic.</param>
    public static void BindService(grpc::ServiceBinderBase serviceBinder, ServerGrpcBase serviceImpl)
    {
      serviceBinder.AddMethod(__Method_AddServer, serviceImpl == null ? null : new grpc::UnaryServerMethod<global::GrpcServer.ServerMessage, global::GrpcServer.ServerActionResponse>(serviceImpl.AddServer));
    }

  }
}
#endregion
