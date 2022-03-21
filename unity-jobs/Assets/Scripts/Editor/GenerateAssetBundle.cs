using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

public class GenerateAssetBundle : MonoBehaviour
{
    private static BuildTarget[] platformsToBuild = new BuildTarget[] { BuildTarget.Android, BuildTarget.WebGL };
    public static void ExecuteMethod()
    {
        Debug.Log("Funcionando");
        EditorApplication.Exit(0);
    }

    public static void CreatePrefab()
    {
        Debug.Log("Testando criar prefab");
        var referencePath = "Assets/Meshes/chairToCreate.fbx";
        var referenceObject = AssetDatabase.LoadAssetAtPath<GameObject>(referencePath);
        var gameObjectOnScene = Instantiate(referenceObject);
        var prefabPath = "Assets/Prefabs/chairToCreate.prefab";
        PrefabUtility.SaveAsPrefabAsset(gameObjectOnScene, prefabPath);
        AssetImporter.GetAtPath(prefabPath).SetAssetBundleNameAndVariant("tempBundle", "");
        DestroyImmediate(gameObjectOnScene);
        BuildAssetBundles();
    }

    public static void Centralize()
    {
        var referencePath = "Assets/Meshes/chairToTest.fbx";
        var referenceObject = AssetDatabase.LoadAssetAtPath<GameObject>(referencePath);
        var gameObjectOnScene = Instantiate(referenceObject);
        NormalizeMesh.Centralize(gameObjectOnScene);
        gameObjectOnScene = gameObjectOnScene.transform.parent.gameObject;
        PrefabUtility.SaveAsPrefabAsset(gameObjectOnScene, "Assets/Meshes/chairToTest2.prefab");
        //DestroyImmediate(gameObjectOnScene);
    }

    private static void BuildAssetBundles()
    {
        foreach (var target in platformsToBuild)
            BuildAssetBundlesPlatform(target);
    }

    private static void BuildAssetBundlesPlatform(BuildTarget buildTarget)
    {
        var assetBundleDirectory = $"AssetBundles/{buildTarget}";
        if (!Directory.Exists(assetBundleDirectory))
            Directory.CreateDirectory(assetBundleDirectory);
        BuildPipeline.BuildAssetBundles(assetBundleDirectory, BuildAssetBundleOptions.ForceRebuildAssetBundle, buildTarget);
        RenameAssetBundles(buildTarget);
    }

    private static void RenameAssetBundles(BuildTarget buildTarget)
    {
        var assetBundleDirectory = $"AssetBundles/{buildTarget}";
        var files = Directory.GetFiles(assetBundleDirectory);
        foreach (var file in files)
        {
            if (!file.Contains("."))
            {
                var fileNameWithExtension = file + ".assetbundle";
                if (File.Exists(fileNameWithExtension))
                    File.Delete(fileNameWithExtension);

                File.Move(file, fileNameWithExtension);
            }
        }
    }
}
